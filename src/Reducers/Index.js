//3
//importar combine para poder agrupar todos los reducers
import { combineReducers } from 'redux'
//importando los reducers
import ProductosReducer from './ProductosReducer'
import AlertaReducer from './AlertaReducer'

//agrupar o combinar los reducers
export default combineReducers({
    //nombre a exportar -> reducer exportado
    productos: ProductosReducer,
    alerta: AlertaReducer

})