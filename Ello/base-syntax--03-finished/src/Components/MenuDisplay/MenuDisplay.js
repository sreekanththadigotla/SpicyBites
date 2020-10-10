/* eslint-disable no-unused-expressions */
import React, {PureComponent } from 'react';
import {  withRouter } from 'react-router-dom';
import Context from '../../Container/AppIndex';
import classes from './MenuDisplay.css';

class Menudisplay extends PureComponent{  
    TotalPrice = 0;
    price =0 ;
    loginCheck=false;

     state = {
         displayDetails:this.props.displayDetails
     }
     componentDidUpdate(prevProps) {
         console.log("HAAAAAAAAAAAAAAAAAAAAAAAAA");
         console.log(prevProps);
         console.log(this.props)
        if(prevProps.displayDetails !== this.props.displayDetails) {
          this.setState({displayDetails: this.props.displayDetails});
        }
      }

      loginGo=() =>
      {
        //  <Redirect to="/login"/>
        console.log(this.props.history.push("/login"))
      }
    render() 
    {  

        // const style = {
        //     disabled:'disabled'
        //       }


        console.log("props are")

        console.log(this.state.displayDetails);
       


        // this.props.displayDetails.map(el => this.TotalPrice=this.TotalPrice+el.price);
        let show;
    //    if(this.props.displayDetails===undefined)
    //    {
    //     return"Hello"
    //    }

     show =this.state.displayDetails.map(I => {
           let  k = I.times * I.price ;
           console.log(k);
           this.price = this.price +k;
           console.log(this.price)

        return(
               <div className={classes.ShowDisp} key={Math.random()}>
                    <div  className={classes.item}> {I.times} x {I.price} {I.name} </div> 
                    <div className={classes.Arrow}>-</div>
                    <div className={classes.prices}>{ I.times*I.price}</div>
               </div>
             )
       })

        if(this.state.displayDetails === undefined ||this.state.displayDetails.length<1 ) {show = <h2 className={classes.ShowDisp}>Please Add Food Items</h2>}

        return(
      

            <div className={classes.MenuDisplay}>
                <div className={classes.InsideMenuDisplay}>
                    <div className={classes.Saved}>
                      <div className={classes.Fontss}> {show}</div>      
                </div>
               </div>

               
                
                <div className={classes.PriceShow}> 
                <div className={classes.F}>Total</div>
                 <div className={classes.Tot}>{ Math.abs(this.props.Total)}</div>  
                 <Context.Consumer>
                   {context =>{
                     console.log(context)
                     context.login===true ? this.loginCheck=true : this.loginCheck = false
                   }
                   }
                 </Context.Consumer>
                {
                   (this.loginCheck | this.state.displayDetails.length>0 && this.loginCheck)  ?  
                                <div className={classes.Order} onClick={()=>this.props.ordered(this.props.displayDetails)}>OrderNow</div>
                            :   <div className={classes.log} onClick={this.loginGo} > login </div>
                }
                </div>
               
            </div>
      
        )

    }
   
    

}

export default withRouter(Menudisplay);