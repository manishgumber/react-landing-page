import React, {useState} from 'react';


function ColorButton(){
    
    //const [color, setColor] = useState({buttonColor:'red'});
    const [state, setState] = useState({
        class:"btn-primary",
        label:"Save"
    });

    // const clickHandler = () => {
        
    //     if(color.buttonColor=='red'){
    //         document.getElementById('colorButton').style.backgroundColor='blue';
    //         setColor({buttonColor:'blue'});
    //     }
    //     else {
    //         document.getElementById('colorButton').style.backgroundColor='red';
    //         setColor({buttonColor:'red'});
    //     }
    // }

    const clickButton=()=>{
        
        if(state.class==='btn-primary'){
            setState({label:'Done',class:'btn-success'});
        } else{
            setState({label:'Save',class:'btn-primary'});
            //setState({...state, class:'btn-primary'});
        }       

    }

    return(

        /* <button type="button" onClick={clickHandler} id="colorButton" className="color-button">Color Button</button> */
        <button type="button" className={`btn ${state.class}`} onClick={clickButton}>{state.label}</button>

    );


}

export default ColorButton;