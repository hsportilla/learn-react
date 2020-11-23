import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, postComment } from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
        fetchDishes: ()   => dispatch(fetchDishes()),
        fetchComments: () => dispatch(fetchComments()),
        fetchPromos: ()   => dispatch(fetchPromos()),
        resetFeedbackForm: () =>  {dispatch(actions.reset('feedback'))}
    }
)

class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render (){
        const HomePage = () => {
            return (
                <Home dish={ this.props.dishes.dishes.find( (dish) => dish.featured )}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={ this.props.promotions.promotions.find( (promotion) => promotion.featured )}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={ this.props.leaders.find( (leader) => leader.featured )}
                />
            )
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.find((dish) => dish.id === parseInt(match.params.dishId,10))} 
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
                  commentsErrMess={this.props.comments.errMess}
                  postComment={this.props.postComment}
                  dishId = {match.params.dishId}
                  />
            );
        }; 
        
        return (
            <div>             
                <Header/>  
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes.dishes} dishesLoading={this.props.dishes.isLoading} dishesErrMess={this.props.dishes.errMess}/> }/>
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path="/contactus" component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> }/>
                        <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders}/> }/>                    
                        <Redirect to="/home"/>
                    </Switch>
                    </CSSTransition>
                </TransitionGroup> 
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
