import envDev from './environment.dev';
// import envUat from './environment.uat';
import envProd from './environment.prod';

let env;

switch (process.env.NODE_ENV) {
  case 'production':
    // if (process.env.PRODUCTION_ENV === 'uat') {
    //   env = envUat;
    // } else {
      env = envProd;
    // }
    break;
  default:
    env = envDev;
    break;
}

export const { 
    api 
    // chatbot, 
    // tenant, 
    // myinfo 
} = env;
