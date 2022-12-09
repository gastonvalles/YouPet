
const setItem =(key,value)=>{
    
    window.localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key) =>{
    if(window.localStorage.getItem(key)){
        return JSON.parse(window.localStorage.getItem(key));
    }
    return undefined;
}

export function setUser (user){
    setItem('user', user);
}

export function getUser (){
    getItem('user');
}

export function clear (){
    window.localStorage.clear();
}