import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import { Modal, Form, Icon, Input, Button, Alert } from 'antd';


const LoginModal = () => {

    const [globalState, setGlobalState] = useContext(AppContext);
    const [stateLogin, setStateLogin] = useState({ loading: false, InvalidAlert: false });

    let email, password;

    const handleOk = () => {

        const formData = {
            email: email.input.value,
            password: password.input.value
        }

        fetch(
            `${process.env.REACT_APP_API_URL}/auth/login/`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"

                }
            }
        ).then(async res => {

            let resJSON = await res.json()
            setStateLogin({ ...stateLogin, loading: true });

            if (res.ok) {
                //console.log(resJSON);
                setTimeout(() => {
                    setGlobalState({ ...globalState, loggedIn: true, token: resJSON.token });
                    localStorage.setItem('token', resJSON.token)
                    setStateLogin({ ...stateLogin, loading: false });
                }, 1000);

            }
            else {
                setStateLogin({ ...stateLogin, loading: false, InvalidAlert: true });
            }

        });


    };

    const handleCancel = () => {
        setGlobalState({ ...globalState, loginForm: false });
    };


    return (

        <Modal visible={globalState.loginForm} title="Login" onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>Cancel</Button>,
                <Button key="submit" type="primary" loading={stateLogin.loading} onClick={handleOk}>Submit</Button>,
            ]}>
            {
                stateLogin.InvalidAlert &&
                <div>
                    <Alert message="Invalid credentials entered!" type="error" />
                    <br />
                </div>
            }
            <Form onSubmit={handleOk} className="login-form">
                <Form.Item>
                    <Input ref={comp => email = comp} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email address" />
                </Form.Item>
                <Form.Item>
                    <Input.Password ref={comp => password = comp} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                </Form.Item>
            </Form>
        </Modal>

        // <div className="modal-container">
        //     <div className="modal login" tabindex="-1">
        //         <div>
        //             <div className="modal-content">
        //             <div className="modal-header">
        //                 <h5 className="modal-title">Login</h5>
        //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={prop.onClose}>
        //                 <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div className="modal-body">

        //                 <div class="form-group">
        //                     <label for="inputEmail">Username</label>
        //                     <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"></input>

        //                 </div>
        //                 <div class="form-group">
        //                     <label for="inputPassword">Password</label>
        //                     <input type="password" class="form-control" id="inputPassword" ></input>
        //                 </div>                                                     

        //             </div>
        //             <div className="modal-footer">
        //                 <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={prop.onCancel}>Cancel</button>
        //                 <button type="button" className="btn btn-primary" onClick={prop.onSignIn}>Sign in</button>
        //             </div>
        //             </div>
        //         </div>
        //     </div>        
        // </div>



    );

}


export default LoginModal;