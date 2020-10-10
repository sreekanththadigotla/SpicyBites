import React, { Component, Suspense } from 'react';
import classes from './App.css';
import Layout from './Components/Layout/Layout';
// import Menuuu from './Container/Menu/Menu';


import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import ContactData from './Container/ContactData/ContactData';
import HeaderMaintain from './Container/HomePageMaintain/HeaderMaintain';
// import Login from './Components/Login/Login';
import Order from './Components/Orders/Orders';
import { connect } from 'react-redux';
import { checkValidity } from './Components/Login/Auth';
import Context from './Container/AppIndex';
// import { Helmet } from 'react-helmet';


const Menus = React.lazy(() => import('./Container/Menu/Menu'));
const ContactData = React.lazy(()=>import('./Container/ContactData/ContactData'));
const Llogin = React.lazy(()=>import('./Components/Login/Login'));
 
class App extends Component {
  

  componentDidMount() 
  { 
    this.props.Check();
  }
  render(){

    return (
      <BrowserRouter>
      {/* <Helmet> */}
        <Layout  className={classes.App}>
         <Switch>
         <Route path="/menu"  render={ () => (<Suspense fallback={<div>Loading . . .</div>}>
          <Context.Provider value={{login:this.props.IdToken}}>
          <Menus/>
           </Context.Provider>
           </Suspense>)}/>

          <Route path="/home" component={HeaderMaintain}/>

         <Route path="/contact"  render={()=>(<Suspense fallback={<div>Loading . . .</div>}><ContactData/></Suspense>)} />
        
         <Route path="/login" exact render={() =>(<Suspense fallback={<div>Loading...</div>}>
           
           <Llogin/>
           
           
           
           </Suspense>)}/>
 
         <Route path="/order" exact component={Order}/>
         <Redirect from="/" to="/Home"/>
         </Switch>
        

        </Layout>
        {/* </Helmet> */}
      </BrowserRouter>
   
    );

  }

   
   }


  

    
  const mapStateToProps = (state) =>
  {
    return {
      IdToken:state.authReducer.token ? true : false
      
    }
  }



  const mapDisptchToProps = (dispatch) =>
  {
    return {
      Check: () => dispatch (checkValidity()),
      
    }
  }

 

export default  connect(mapStateToProps, mapDisptchToProps) (App);
