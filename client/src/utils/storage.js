
const setItem =(key,value)=>{
    
    window.localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key) =>{
    if(window.localStorage.getItem(key)){
        return JSON.parse(window.localStorage.getItem(key));
    }
    return undefined;
}

export function setUser (userf){
    setItem('userf', userf);
}

export function getUser (){
    getItem('userf');
}

export function clear (){
    window.localStorage.clear();
}