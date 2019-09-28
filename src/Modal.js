import React from 'react';
import { booleanLiteral } from '@babel/types';

function Modal(prop){
  

        return (
            
                <div className="modal-container">
                    <div className="modal newsletter">
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
            
        );

}

export default Modal;