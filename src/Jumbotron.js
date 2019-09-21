import React , {useState} from 'react';

function Jumbotron(prop) {

    const [subscribed, setSubscribed] = useState(false);

    function subscribeUser(){
        setSubscribed(true);
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
                        <label for="email" className="sr-only">Email</label>
                        <input type="password" className="form-control" id="email" placeholder="Email Address"></input>
                    </div>
                    <button type="button" onClick={subscribeUser} className="btn btn-primary mb-2">Subscribe</button>
                </form>     


                {subscribed &&
                    <div class="alert alert-success" role="alert">
                        A simple success alert—check it out!
                    </div>
                }          
        </div>
    </div>
        
    )

}
export default Jumbotron;