import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem,Row,Col,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState( (state) => ({
            isModalOpen: !state.isModalOpen
        }));
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message);
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={() => this.toggleModal()}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={{size: 12, offset: 0}}>
                                    <Label>Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                            className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 12, offset: 0}}>
                                    <Label>Your Name</Label>
                                    <Control.text model=".author" name="author"
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators= { {minLength: minLength(3), maxLength: maxLength(15) }}>
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label>Comment</Label>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control">                                    
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )    
    }
}


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

function RenderComments({comms, addComment}){
    let comments;
    if (comms != null){
        comments = [comms.map ( (comment) => 
            <ul className="list-unstyled" key={comment.id}>
                <li>{comment.comment}</li>
                <li>-- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date ( Date.parse(comment.date) ) ) }</li>
            </ul>
        ), <CommentForm dishId={comms[0].dishId} addComment={addComment}/>]
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
                        <RenderComments comms={props.comments} 
                                        addComment={props.addComment}
                                       
                        />                        
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