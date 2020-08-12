import store from 'store';

function setTokenInStorage(token){
    store.set('token', token);
}

function removeTokenInStorage(tokenKey){
    store.remove(tokenKey);
}

function setTokenVerifikasi(token){
    // if(store.get('token_verifikasi') !== token){
    //     store.remove('token_verifikasi');
    // }
    store.set('token_verifikasi', token);
    // return false;
}

function removeTokenVerifikasi(tokenKey){
    // use token key to remove. key = token_verifikasi
    store.remove(tokenKey);
}

function getTokenAuthFromStorage(){
    return store.get('token');
}

const getTokenVerifikasiFromStorage = () => store.get('token_verifikasi');
const getTokenByKey = tokenKey => store.get(tokenKey);
export {
    setTokenInStorage,
    removeTokenInStorage,
    setTokenVerifikasi,
    removeTokenVerifikasi,
    getTokenAuthFromStorage,
    getTokenVerifikasiFromStorage,
    getTokenByKey
}