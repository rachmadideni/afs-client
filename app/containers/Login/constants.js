/*
 *
 * Login constants
 *
 */

export const DEFAULT_ACTION = 'app/Login/DEFAULT_ACTION';
export const CHANGE_NIK = 'app/Login/CHANGE_NIK';
export const CHANGE_EMAIL = 'app/Login/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'app/Login/CHANGE_PASSWORD';
export const LOGIN_ACTION = 'app/Login/LOGIN_ACTION';
export const LOGIN_SUCCESS_ACTION = 'app/Login/LOGIN_SUCCESS_ACTION';
export const LOGIN_ERROR_ACTION = 'app/Login/LOGIN_ERROR_ACTION';

// digenerate sebagai sampel dari http://jwtbuilder.jamiekurtz.com/
/*
CLAIM SETS
{
    "iss": "mps",
    "iat": 1583251489,
    "exp": 1583856289,
    "aud": "app.mps.com",
    "sub": "jrocket@example.com",
    "nik": "01540110",
    "role": "customer"
}
issued at : 2020-03-03T16:04:49.500Z
expire at : 2020-03-10T16:04:49.501Z
audience : app.mps.com 
*/
export const KEY_TOKEN_LOGIN = 'mps';
export const TEST_TOKEN_LOGIN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtcHMiLCJpYXQiOjE1ODMyNTE0ODksImV4cCI6MTU4Mzg1NjI4OSwiYXVkIjoiYXBwLm1wcy5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwibmlrIjoiMDE1NDAxMTAiLCJyb2xlIjoiY3VzdG9tZXIifQ.ghStoI1oE36ZjAccfoRspJd3K3eZeemfHas3o-8CJ2E';
export const RESET_INPUT_ACTION = 'app/Login/RESET_INPUT_ACTION';