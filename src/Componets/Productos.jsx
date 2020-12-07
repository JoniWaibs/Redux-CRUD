import React , { Fragment, useEffect }from 'react'
import Producto from './Producto'



//23 
//import el action de redux
import { obtenerProductos } from '../Actions/ProductoActions'

//importar useDispatch y useSelector - hooks de redux
import { useDispatch , useSelector } from 'react-redux'




const Productos = () => {

    //dispatch para llamar al action
    const dispatch = useDispatch()

    //24 
    //consultar la api con el dispatch
    useEffect(() => {

       const consultarAPI = () =>{
            dispatch( obtenerProductos()  )
       };
       consultarAPI();
       //eslint-disable-next-line
    }, []);
    //25
    //obtener del state los productos
    const stateProductos = useSelector( state => state.productos.productos )
    //obtener del state  el error 
    const stateError = useSelector( state => state.productos.error )
    //obtetener del state el loading
    const stateLoading = useSelector( state => state.productos.loading )


    return (
        <Fragment>
            <div className="container">
                <div className="mx-auto mt-5">
                    <h1 className="text-center">Linea de productos</h1>
                    { stateError ? <p className="alert alert-danger mb-0 text-center">No se pueden descargar los productos</p>  : null }
                    { stateLoading ?<p className="text-center">Cargando...</p>  : null }
                    <table className="table table-striped mt-5 text-center">
                        <thead className="bg-primary table-dark"> 
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            { stateProductos.length === 0 ? null : (
                                stateProductos.map( prod => (
                                   <Producto
                                        key={prod.id}
                                        prod={prod}
                                   />
                                ))
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
            
        </Fragment>
    )
}

export default Productos
