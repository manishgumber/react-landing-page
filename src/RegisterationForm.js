import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Alert,
    Drawer,
    message
} from 'antd';

const RegistrationForm = (prop) => {

    const [state, setState] = useState({
        register: null,
        alertMsg: '',
        loading: false
    })

    let name, email, occupation, password;

    const submitForm = () => {

        //setState({ ...state, loading: true });

        prop.onClose();
        const submitMessage = message.loading('Registering...', 0);

        const formData = {
            name: name.input.value,
            email: email.input.value,
            occupation: occupation.input.value,
            password: password.input.value
        }

        fetch(
            'http://localhost:5000/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            }
        ).then(async res => {
            let resJSON = await res.json()


            if (res.ok) {

                //res.status==200
                // console.log("You have been registered successfully");

                setTimeout(submitMessage, 1);
                setState({ ...state, register: 'OK', alertMsg: resJSON.message });
                message.success(resJSON.message, 3);


            }
            else if (res.status === 400) {
                // alertMsg = "User already exists";
                setTimeout(submitMessage, 1);
                setState({ ...state, register: 'ERROR', alertMsg: resJSON.message });
                message.error(resJSON.message, 5);
            }
            else {

            }
        })
    }

    return (

        // <div className="container">
        <Drawer title="Register" width={720} onClose={prop.onClose} visible={prop.visible}>
            {
                state.register === 'ERROR' &&
                <Alert message={state.alertMsg} type="error" showIcon />
            }
            {
                state.register === 'OK' &&
                <Alert message={state.alertMsg} type="success" showIcon />
            }
            <Form className="form">
                <Form.Item label="Name" required>
                    <Input ref={comp => name = comp} placeholder="Name" />
                </Form.Item>
                <Form.Item label="Email" required>
                    <Input ref={comp => email = comp} placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" required>
                    <Input.Password ref={comp => password = comp} placeholder="Password" />
                </Form.Item>
                <Form.Item label="Occupation" required>
                    <Input ref={comp => occupation = comp} placeholder="Occupation" />
                </Form.Item>
                {/* <Form.Item> */}
                {/* <Button 
                    loading={state.loading}
                    onClick={submitForm}
                    type="primary" htmlType="submit">
                        Submit
                    </Button> */}
                {/* </Form.Item> */}
            </Form>
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                }}
            >
                <Button onClick={prop.onClose} style={{ marginRight: 8 }}> Cancel </Button>
                <Button loading={state.loading} onClick={submitForm} type="primary" htmlType="submit"> Submit </Button>
            </div>
        </Drawer>
        // </div>
    )
}

export default RegistrationForm;