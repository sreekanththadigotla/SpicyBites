import React, { Component } from 'react';
import PersonalInput from '../../Components/Personalnput/Personalnput';
import classes from './ContactData.css';
import emailjs, { send } from 'emailjs-com';

class ContactData extends Component {

      state  ={
          orderForm:{
           name:{
            elementType:'input',
            elementConfig:{
                type:"text",
                placeholder:"Name",
                minLength:3,
                name:"name"
            },
            value:"",
            validation:{
                required:true,
            },
            valid:false,
            touched:false
           },
           email:{
               elementType:"input",
               elementConfig:{
                   type:"email",
                   placeholder:"Email",
                   isEmail:false,
                   minLength:3,
                   name:"email"
               },
               value:"",
               validation:{
                   required:"true",
                   minLength:2
               },
               valid:false,
               touched:false
           },
           PhoneNumber:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Phone Number",
                isNumber:false,
                minLength:3,
                name:"phone"
            },
            value:"",
            validation:{
                required:"true",
                minLength:2
            },
            valid:false,
            touched:false
        },
           textArea:{
            elementType:"TextArea",
            elementConfig:{
                type:"textArea",
                placeholder:"Address",
                name:"address"
            },
            value:"",
            validation:{
                required:"true",
                
            },
            valid:false,
            touched:false
           }  
          },

        //   Address:{
        //        elementType:'TextArea',
        //        elementConfig:{
        //            type:"TextArea",
        //            placeholder:"Enter your Address",
        //            name:"address"
        //        },
        //        value:"",
        //        validation:{
        //            required:true
        //        },
        //        valid:false
        //   },

          showLabel:false,
          error:false,
          sucess:false
      }


    changeHandler(event, key)
      {
           console.log(event.target.value);

           let one = {...this.state.orderForm};

           let two = {...one[key]};

           two.value = event.target.value;

           one[key] = two;

           one[key].valid  =  this.verifyHandler(event.target.value,one[key].validation);

           console.log("After Modification");

           console.log(one);

           this.setState({orderForm:one});

           
      }


    verifyHandler(eventValue,key)
      {  
           let see = true;

           if(key.required)
           {
              see =  eventValue.trim() !=='' && see;
           }

           if(key.minLength)
           {
               see = key.minLength < eventValue.trim().length && see;
           }

           if(key.maxLength)
           {
               see = key.maxLength > eventValue.trim().length&& see;
           }

           if (key.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            see = pattern.test(eventValue) && see;
            }

        if (key.isNumeric) {
            const pattern = /^\d+$/;
            see = pattern.test(eventValue) && see;
        }

           return see;
      }


p = "hello";

    sendEmail=(e) =>{
        e.preventDefault();
        console.log("Sending");
        console.log(e);
       if(e.target !==null)
       {
        emailjs.sendForm('gmail', 'template_wzne155', e.target, 'user_gplDcWxu2SxXur4PkQ8s7')
        .then((result) => {
            console.log(result.text);
            this.setState({error:false,sucess:true}) 
            
            
        }, (error) => {
            console.log(error.text);
           this.setState({error:true,sucess:false}) 
          
        });
        console.log( e.target)
        e.target.reset();

       } 
       
        
 
      }


 render(){
         let newArray = [];
        
         for (let key in this.state.orderForm)
        {
            newArray.push({
                           key:key,
                           details:this.state.orderForm[key]
                         })
        } 
         
          console.log("NewArray");
  
          console.log(newArray)
 
          let show = newArray.map(el =>
            {
              return <PersonalInput 
                topLabel={this.state.showLabel}
                key={el.key}
                label={el.details.elementConfig.placeholder}
                elementType={el.details.elementType} 
                elementConfig={el.details.elementConfig}
                value={el.details.value}  
                valid={el.details.valid}
                changed={(event) =>this.changeHandler(event,el.key)}></PersonalInput>
            })
         
          
          return( 
            <form onSubmit={this.sendEmail.bind(this)}>
             <div className={classes.PersonalD}>
            <div  className  ={classes.Personal}>
            <p   className={classes.d}>Want to know offers </p>
              <div className={classes.ss}>  {this.state.error ? "Please Enter some Information like email or phno or name" : null} </div>
              <div className={classes.ss}>  {this.state.sucess ? "Submitted Sucessfully" : null} </div>
                         {show}
              <button className={classes.CS} type="submit">SUBMIT</button>
            </div>
            
            </div>
            </form>
                
               
                  
                )
      }

}

export default ContactData;