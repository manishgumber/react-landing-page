import React, { useState } from 'react';
import Modal from './Modal';
import { validateEmail } from './utils';



function Jumbotron(prop) {

    const [state, setState] = useState({ emailValid: null, modal: 'hidden' });

    let emailField;

    function subscribeUser() {

        if (!validateEmail(emailField.value)) {
            setState({ emailValid: "invalid" });
        } else {
            setState({ emailValid: "valid", modal: 'visible' });
        }
    }

    function closeModal() {
        setState({ ...state, modal: 'hidden' });
    }


    return (


        <div className="jumbotron">
            <div className="container">
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
                    {
                        state.emailValid !== "valid" &&
                        <button type="button" onClick={subscribeUser} className="btn btn-primary mb-2">Subscribe</button>
                    }
                </form>

                {
                    state.emailValid === "valid" &&
                    state.modal === 'visible' &&
                    <Modal onClose={closeModal}></Modal>

                }
                {
                    state.emailValid === "invalid" &&
                    <div className="alert alert-danger">
                        Please enter a valid email address.
                    </div>
                }
            </div>

        </div>

    )

}
export default Jumbotron;