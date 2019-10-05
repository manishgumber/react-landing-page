import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import { Modal, Form, Icon, Input, Button } from 'antd';


function LoginModal(prop) {

    //const [globalState, setGlobalState] = useContext(AppContext);



    return (

        <Modal visible={prop.visible} title="Login" onOk={prop.onOk} onCancel={prop.onCancel}
            footer={[
                <Button key="back" onClick={prop.onCancel}>Cancel</Button>,
                <Button key="submit" type="primary" loading={prop.loading} onClick={prop.onSubmit}>Submit</Button>,
            ]}>
            <Form onSubmit={prop.handleOk} className="login-form">
                <Form.Item>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                </Form.Item>
                <Form.Item>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
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