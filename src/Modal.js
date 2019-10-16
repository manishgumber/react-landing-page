import React, { useState } from 'react';
import { stat } from 'fs';


function Modal(prop) {

    const [state, setState] = useState({ visible: true });

    const clickHandler = (e) => {
        setState({ visible: false });
    }

    const childClickHandler = (e) => {
        e.stopPropagation();
    }


    return (

        <div>
            {state.visible &&
                <div onClick={clickHandler} className="modal-container">
                    <div onClick={childClickHandler} className="modal newsletter">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Newsletter</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={prop.onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>You have subscribed successfully.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>



    );

}

export default Modal;