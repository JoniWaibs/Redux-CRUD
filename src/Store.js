//1
//instalar e importar estas dependencias
import { createStore , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//4 importar el reducer que agrupa a todos los reducers
import reducer from './Reducers/Index'

//5
//crear el store
const store = createStore(
    //los params del store
    //a - el reducer 
    //b - compose
    reducer,
    compose ( applyMiddleware(thunk),
        typeof window ==='object'&&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'  ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f//detecta si tenemos redux-devtools en chrome y le agrega funcionalidades
    )
    
);

export default store; //el store debe exportarse al componente principal para que fluyan los datos, lo exportamos al app.js