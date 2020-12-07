import React , { useState, useEffect } from 'react'
import Error from './Error'
//35 importar los hooks de redux
import { useDispatch,  useSelector } from 'react-redux'
//37 importar el action 
import { editarProductoAction } from '../Actions/ProductoActions'
import { useHistory } from 'react-router-dom'

const EditarProducto = () => {
    const history = useHistory()
    const [ error , setError ] = useState(false)
    //36
    //State del nuevo producto
    const [editado , setEditado ] = useState({
        nombre:"",
        precio:"",
    })
    const { nombre , precio } = editado;  
    //traer el state con el producto a editar usando useSelector
    const prodParaEditar = useSelector( state => state.productos.productoEditar)
    const dispatch = useDispatch( editarProductoAction )
    //llenar el state del componente con el producto que llega del state anterior
    useEffect(() => {
        setEditado(prodParaEditar)
      }, [prodParaEditar])
    
   
    //38
    //conseguir los nuevos datos y almacenaerlos en el stat
    const editarProducto = e =>{
        setEditado({
            ...editado,
            [e.target.name]:e.target.value
        })

    }

    //39
    //recibe la edicion del form 
    const edicionRealizada = e =>{
        e.preventDefault()

        //valdar que no caigan vacios
        if( nombre === "" || precio < 0){
            setError(true)
            return; 
        }
        setError(false)
        //enviar el producto editado al action para ser modificado en la api
        dispatch( editarProductoAction(editado) )
        history.push('/')
    }

    return (
        <div>
        <div className="container">
            <form 
                className="card p-3 col-md-8 my-5 mx-auto"
                onSubmit={edicionRealizada}
            >
                <h1 className="text-center my-4">Editar Producto</h1>
                { error ? <Error/> : null }
                <div className="form-group">
                    <label>Nombre del producto</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Ej: Zapatillas deportivas"
                        name="nombre"
                        value={nombre}
                        onChange={editarProducto}
                    />
                </div>
                <div className="form-group">
                    <label>Precio del producto</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Ej: USD 300"
                        name="precio"
                        value={precio}
                        onChange={editarProducto}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        className="btn btn-info btn-block btn-lg text-uppercase"
                        placeholder="Ej: USD 300"
                        value="guardar cambios"    
                    />
                </div>
            </form>
        </div>
    </div>
    )
}

export default EditarProducto
