import React, { useState } from 'react'
//10 
//importar el action de redux que crea los productos
import { crearNuevoProductoAction  } from '../Actions/ProductoActions' 
//11
//importar dos hooks de redux para ejecutar el action y acceder al estate del componente
import { useDispatch , useSelector  } from 'react-redux'
//46 importar el action
import { mostrarAlerta, ocultarAlerta } from '../Actions/AlertaActions'
const NuevoProducto = () => {
    //12
    //dispatch retorna una funcion, guardar en una const 
    const dispatch = useDispatch();
    //el dispatch se requiere usar cada vez que ejecutamos algun action aca cargar un producto
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );
    //13
    //crear el state de producto y de error
    const [ producto , setProducto ] = useState({
        nombre: "",
        precio:Number(0),
        id:"",
    });
    const { nombre , precio } = producto;
    //20 acceder al state del store para eso tenemos el useSelector
    const Loading = useSelector( state => state.productos.loading );
    //45 traer el state de alerta y usar habilitar el action mediante dispatch
    const alertaOn = alerta => dispatch( mostrarAlerta( alerta ) );
    const alertaOff = () =>  dispatch( ocultarAlerta() )
    const alerta = useSelector( state => state.alerta.alerta  )

    //agregar los datos al state
    const agregarDatos = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value,
        });
    };
    
    //submit form
    const submitNuevoProducto = e =>{
        e.preventDefault()
        //validar formulario
        if( nombre.trim() === "" || precio <= 0){
            const alerta = {
                msj: 'Ambos campos son obligatorios'
            }    
            
            alertaOn(alerta)
            return
        }
        //si no hay errores
        alertaOff()
        //crear el nuievo producto
        agregarProducto( producto );

        //redirect

    
    }

    return (
        <div>
            <div className="container">
                
                <form className="card p-3 col-md-8 my-5 mx-auto" onSubmit={submitNuevoProducto}>
                    <h1 className="text-center my-4">Agregar nuevo Producto</h1>
                    { alerta ? <p>{alerta.msj}</p> : null }
                    <div className="form-group">
                        <label>Nombre del producto</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Ej: Zapatillas deportivas"
                            name="nombre"
                            value={nombre}
                            onChange={agregarDatos}
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
                            onChange={agregarDatos}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btn btn-success btn-block btn-lg text-uppercase"
                            placeholder="Ej: USD 300"
                            value="Agregar producto"    
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevoProducto
