import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({dish}){
    if (dish != null){
        return(   
            <Card>
                <CardImg  width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return(<div></div>);
    }
}

function RenderComments({comms}){
    let comments;
    if (comms != null){
        comments = comms.map ( (comment) => 
            <ul className="list-unstyled" key={comment.id}>
                <li>{comment.comment}</li>
                <li>-- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date ( Date.parse(comment.date) ) ) }</li>
            </ul>
        );
    }
    else {
        comments = <div></div>
    }
    return comments
}

function DishDetail(props){
    if (props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <RenderComments comms={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}


export default DishDetail;