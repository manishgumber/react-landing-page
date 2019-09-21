import React , {useState} from 'react';
import { validateEmail } from './utils';

function Jumbotron(prop) {

    const [state, setState] = useState(
        {emailValid:null}

    );
    let emailField;

    function subscribeUser(){

            if(!validateEmail(emailField.value)){
               setState({emailValid:"invalid"})
            } else{
                setState({emailValid:"valid"})
            }        
    }
    

return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">{prop.title}</h1>
                <p className="lead">{prop.lead}</p>
                <hr className="my-4"></hr>
                <div className="mx-sm-2">
                    <p>{prop.description}</p>
                </div>
                <form className="form-inline">                    
                    <div className="form-group mx-sm-2 mb-2">
                        <label for="emailAddress" className="sr-only">Email</label>
                        <input ref={inputField => emailField = inputField} type="email" className="form-control" id="emailAddress" placeholder="Email Address"></input>
                    </div>
                    <button type="button" onClick={subscribeUser} className="btn btn-primary mb-2">Subscribe</button>
                </form>     


                {
                    state. emailValid === "valid" &&
                    <div class="alert alert-success" role="alert">
                       You have subscribed successfully!
                    </div>
                }       
                {
                     state. emailValid === "invalid" &&
                     <div class="alert alert-danger" role="alert">
                        Please enter a valid email address.
                    </div>
                }   
        </div>
    </div>
        
    )

}
export default Jumbotron;