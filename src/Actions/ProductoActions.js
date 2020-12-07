//9 importar los types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO,
    OBTENER_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO,
    COMENZAR_EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR,
} from "../types/index";
//18 importar el cliente 
import clienteAxios from '../Config/Axios' 
import Swal from 'sweetalert2'



//TODOS LOS ACTIONS EN UN MISMO FICHERO
//GUARDAR LOS PRODUCTOS
export function crearNuevoProductoAction(producto){
    //acciones que se ejecutaran al momento de que este action se ejecute

    //14
    return async (dispatch) => {
        console.log(producto)
        dispatch( agregarProducto(producto) )//aviso de agregar producto

        //Agregar el producto definitivamente
        try{

            //19 inserar en la fake api el nuevo cliente
            await clienteAxios.post('/productos', producto)
            Swal.fire(
                'Correcto',
                'Producto agregado correctamente',
                'success'
            )
            //Si todo sale bien
            dispatch( productoAgregado(producto) )    
        } catch( err ){ 
            //si hay un error
            console.log( err )
            dispatch( productoNoAgregado( true ) )
            Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Hubo un error, intenta nuevamente!'
            })
        }
        

    }
} 
//exportar la funcion al componetne que corresponfam en este caso el componente que crea los productos
//15
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
});
const productoAgregado = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,   
    payload: producto,
});
const productoNoAgregado = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado,  
});



//21
///OBTENER LOS PRODUCTOS
export const obtenerProductos = () =>{
    return async (dispatch) =>{
        //informar descarga
        dispatch( descargandoProds()  )
        try{
            //descargar
            const respuesta = await clienteAxios.get('/productos')
            console.log(respuesta , 'desde la descarga')
            //si todo salio bien
            dispatch( descargadosProds(respuesta.data) )
            return respuesta.data
        }catch( err ){
            //error en decarga
            console.log( err )
            dispatch( errorDescargaProds() )
            //alerta
        }
    }
}

//evaluar los types tambien en el mismo reducer
const descargandoProds = () =>({
    type: OBTENER_PRODUCTO,
    payload: true
}) 
const descargadosProds = (respuesta) =>({
    type: OBTENER_PRODUCTO_EXITO ,
    payload: respuesta,
})
const errorDescargaProds = () =>({
    type: OBTENER_PRODUCTO_ERROR ,
    payload: true
})

//27 
//ELIMINAR LOS PRODUCTOS DE LA DB
export const eliminarProducto = id =>{
    return async (dispatch) =>{
        console.log(id , 'Desde action')
        //informar borrado para que se quite de redux
        dispatch( eliminandoProd(id)  )  

        try{
            //borrar de la api
           await clienteAxios.delete(`/productos/${id}`)
           console.log(id , 'Borrado')
            //producto borrado con exito
            dispatch( productoBorradoExito(id) )

        }catch( err ){
            console.log( err )
            //producto error al borrar
            dispatch( productoBorradoErro() )
        }
    }
}

const eliminandoProd = id =>({
    type: ELIMINAR_PRODUCTO,
    payload: id,
})

const productoBorradoExito = id => ({
    type:ELIMINAR_PRODUCTO_EXITO,
    payload: id

})

const productoBorradoErro = () => ({
    type:ELIMINAR_PRODUCTO_ERROR,
    payload: true,
})

//33 
//EDITAR ARTICULOS
//funcion para conseguir el articulo individual que quiero editar
export const editarProducto = prod =>{
    return (dispatch) =>{
        console.log(prod)
        dispatch(obtenerProducto( prod ))  
    }
}

const obtenerProducto = prod =>({
    type: EDITAR_PRODUCTO,
    payload: prod,
})
//Funcion que devuelve el producto editado forma parte del punto anterior
export const editarProductoAction = producto =>{
    return async (dispatch)=>{
        console.log(producto)
        dispatch( editandoProducto() )

        try{
            await clienteAxios.put(`/productos/${producto.id}` , producto)
            dispatch( editarProductoExito(producto) )

        }catch( err ){
            console.log(err)
            dispatch( editarProductoError() )
        }
        

    }
}

const editandoProducto = () =>({
    type: COMENZAR_EDITAR_PRODUCTO,
})

const editarProductoExito = producto =>({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto,
})
const editarProductoError = () =>({
    type: EDITAR_PRODUCTO_ERROR ,
    payload: true
})