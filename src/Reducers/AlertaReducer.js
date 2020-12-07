//41 crear el reducer de alerta
//importar types
import { MOSTRAR_ALERTA , OCULTAR_ALERTA } from '../types/index'

//declarar el state inicial
const initialState = {
    alerta : null
};

//evaluar el action
export default function( state = initialState , action ){
    switch(action.type){
        //44
        //configurar los casos
        case MOSTRAR_ALERTA:
            return{
                ...state,
                alerta: action.payload,
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                alerta: null,
            }
        default:
            return state;    
    }
};