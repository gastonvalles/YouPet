import React from "react";

const Headerl = (props) =>{
    return (
        <nav className="navbar navbar-light bg-light">
            <div>
                <a className="navbar-brand" href="/">Facebook Login</a>
            </div>
            {props.children}
        </nav>
    );

};

export default Headerl;