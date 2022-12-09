import React from "react";

const ShareButton =({url, title}) =>{
    return(
        <span 
        onClick={onclick} 
        title= "Compartir en facebook"
        className="share-btn"
        >
            <img src={} alt={title}/>
        </span>
    )

}

export default ShareButton;
