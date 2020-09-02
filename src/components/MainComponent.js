import React, { Component } from 'react';
import Home from './HomeComponent';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponents';
import DishDetail from './DishdetailComponent';

import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment } from '../redux/ActionCreater';
import {TransitionGroup,CSSTransition} from 'react-transition-group';



const mapStateToProps=state =>{
    return{
      dishes:state.dishes,
      comments:state.comments,
      promotions:state.promotions,
      leaders:state.leaders
    }
}

//  const mapDispatchToProps = dispatch => ({
  
//   addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

// });

class Main extends Component {

  constructor(props){
    super(props);
    

  }

 
  render() {

    const HomePage=() =>{
        return(
            <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
                leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
            
                />

            );
    }

    const DishWithId=({match})=>{
        return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
        );
    }
    return (
      <div>
       <Header></Header>
       <TransitionGroup>
         <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                 <Switch>
            <Route path="/home" component={HomePage}/>
            <Route path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
            <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/>}/>
            <Route path ="/menu/:dishId" component={DishWithId}/>
          
            <Route exact path="/contactus" component={Contact}/>
            
            <Redirect to="/home"></Redirect>
        </Switch>
        </CSSTransition>
           </TransitionGroup>
            <Footer></Footer>
        
         </div>
    
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));