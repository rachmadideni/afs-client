import store from 'store';

function setTokenInStorage(token){
    store.set('token', token);
}

function removeTokenInStorage(tokenKey){
    store.remove(tokenKey);
}

function setTokenVerifikasi(token){
    store.set('token_verifikasi', token);
}

function removeTokenVerifikasi(tokenKey){
    // use token key to remove. key = token_verifikasi
    store.remove(tokenKey);
}

function getTokenAuthFromStorage(){
    return store.get('token');
}

// function getTokenVerifikasiFromStorage(){
//     const token = store.get('token_verifikasi'); 
//     return token;
// }

export {
    setTokenInStorage,
    removeTokenInStorage,
    setTokenVerifikasi,
    removeTokenVerifikasi,
    getTokenAuthFromStorage,
    // getTokenVerifikasiFromStorage
}