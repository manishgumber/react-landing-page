import React from 'react';

function NavBar(prop){

    return (
        
            <nav className="navbar navbar-light">
                <form className="form-inline">
                    <a href="#">{prop.logo}</a>
                    <button className="btn btn-outline-success" type="button">Main button</button>
                    <button className="btn btn-primary" type="button">Smaller button</button>
                </form>
            </nav>
    
    );
}


export default NavBar;