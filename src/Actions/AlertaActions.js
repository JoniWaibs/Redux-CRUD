//42
//importar types
import { MOSTRAR_ALERTA , OCULTAR_ALERTA } from '../types/index'

//43
//crear el action para mostrar
export function mostrarAlerta(alerta){
    //modificar el action usando con dispatch
    return ( dispatch )=>{
        console.log(alerta)
        dispatch( show(alerta) )
    }
}

export const show = alerta=>({
    type:MOSTRAR_ALERTA,
    payload: alerta,
})
//ocultar alerta
export function ocultarAlerta(){
    return ( dispatch ) =>{
        dispatch( off() )
    }    
}
export const off = ()=>({
    type:OCULTAR_ALERTA
})