//8 importar los types
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
  EDITAR_PRODUCTO_EXITO,
  EDITAR_PRODUCTO_ERROR,
} from "../types/index";

//2
//cada reducer tiene su propio state

const initialState = {
  //Que propiedades debe tener el state de productos?
  productos: [], //cuando tenemos un listado de algo siempre conviene tener un array vacio que se ira llenando
  error: null, //false o null, cualquiera esta bien
  loading: false, // porque puede que la api tarde en descargar, entonces comienza como false y cuando descargo pasa a true
  //28 agregar un nuevo elemento al state, sera el elemento a eliminar
  productoEliminar: null,
  //34 agrego un nuevo elemento al state para editar un producto
  productoEditar: null,
};





//exportamos una funcion, recibe un state y un action(viene un type) desde el store, pero si el state no llega, toma el initialState que configuramos arriba
export default function (state = initialState, action) {
  //el reducer esn switch
  switch (
    action.type //evaluamos el tipo de accion que esta llegando por params
  ) {
    //16 CASES AGREGAR
    //En caso de que se ejecute el type que agrega un nuevo producto
    case AGREGAR_PRODUCTO:
      //retorname una copia del state actual y cambia el aviso de loading a true
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_PRODUCTO_EXITO:
      //Lo anterior + agregar el nuevo producto al state
      return {
        ...state,
        loading: true,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
      //Lo anterior + agregar el nuevo producto al state
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    //23 CASES OBTENER 
    //EValuar los types de obtner productos taambien aqui
    case OBTENER_PRODUCTO:
      //retorname una copia del state actual y cambia el aviso de loading a true
      return {
        ...state,
        loading: true,
      };
    //evaluo el type que consulta la api para traer los articulos
    case OBTENER_PRODUCTO_EXITO:
      //retorna los productos descargados y los almacena en el array productos
      return {
        ...state,
        loading: false,
        productos: action.payload,
      };
    case OBTENER_PRODUCTO_ERROR:
      //Lo anterior + agregar el nuevo producto al state
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    
    //29
    //CASES ELIMINAR
    case ELIMINAR_PRODUCTO:
      //retornar una copia del state + el id del producto a borrar
      return {
        ...state,
        productoEliminar: action.payload,
      };

    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        productoEliminar: action.payload,//el id del producto a borrar
        //usar filter para recorrer el array de procutos y quitar el elemento eliminado
        productos: state.productos.filter( prod => prod.id !==  state.productoEliminar),
        productoEliminar: null,
      };
    case ELIMINAR_PRODUCTO_ERROR:
        return {
          ...state,
          error: action.payload,
        };  
       
    //35    
    //CASES EDITAR PRODUCTO
    case EDITAR_PRODUCTO:
      return {
        ...state,
        productoEditar: action.payload,
      };
    case EDITAR_PRODUCTO_EXITO:
      return {
        ...state,
        productoEditar: null,
        productos: state.productos.map( prod => prod.id = action.payload.id ? prod = action.payload : prod)
      }; 
    case EDITAR_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
      };  
         
    //por defecto devuelve el state base si no se cumple ningun caso
    default:
      return state;
  }
}
