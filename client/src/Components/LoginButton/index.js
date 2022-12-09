import React from "react";
import './style.css' 

const LoginButton = ({onLogin}) =>{
    
    const facebookLogin =() =>{
        if(!window.FB) return;
        //login
        window.FB.getLoginStatus(response =>{
            if(response.status === "connected"){
                //leer datos usuario
                facebookLoginHandler(response)

            }else {
                //intentar iniciar sesion 
                window.FB.login(facebookLoginHandler, {scope: 'public_profile,email'});
            }
        })

    }

    const facebookLoginHandler = (response) =>{
        console.log('resp',response)
        if(response.status === "connected"){
            //leer datos usuario
            window.FB.api('/me?fields=id,name,email,picture', userData =>{
                console.log(userData);
                //almacenar sesion de usuario
                const user = {
                    ...userData,
                    accesToken: response.authResponse.accesToken
                }
                onLogin(user);
            });
        }

    }

    return(
<div className="loginWrapper">
<a onClick={facebookLogin} className="login">
    <span>Conectame con Facebook</span>
</a>
</div>
    )
}

export default LoginButton;