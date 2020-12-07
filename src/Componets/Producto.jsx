import React from "react";
import { useHistory  } from 'react-router-dom'
//30 
//importar el action y el dispatch
import { eliminarProducto , editarProducto } from '../Actions/ProductoActions'
import {  useDispatch } from 'react-redux'
import Swal from 'sweetalert2'



const Producto = ({ prod }) => {
  //31 construir la logica, al clickear el boton borrar primero confirme, luego envie el id y a traves del dispatch de conecte con el action para borrar

  //llamar el dispatch para conectar con el action 
  const dispatch = useDispatch()
  //ejecutar el dispatch
  const eliminarThisProducto = id => dispatch( eliminarProducto(id) )


  //conseguir el id del producto para eliminar
  const capturarID = id =>{ 
    console.log(id , 'desde el producto')

    //confirmar si esta seguro
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //enviar el id para borrar
        eliminarThisProducto(id)
        //avisar
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  
  }

  //34
  //conseguir el producto a editar con useHistory, paso el id por url pero carga todo el obj
  const history = useHistory()
  //ejecutar otro dispatch
  const editarThisProducto = prod => dispatch( editarProducto(prod) )
  //redireccionar con ddatos del objeto actual
  const redireccionarEdicion = prod =>{
    //redirect
    history.push(`/productos/editar/${prod.id}`)

    //enviar el producto a el action
    editarThisProducto(prod)

  }




  return (
    <tr>
      <th scope="col pb-0">{prod.nombre}</th>
      <th scope="col pb-0">{prod.precio}</th>
      <th scope="col pb-0">
          <button 
            type="button"
            className="btn btn-info mx-1"
            onClick={ () => redireccionarEdicion(prod) }
            >
              Editar
          </button>
          <button 
            type="button" 
            className="btn btn-danger mx-1" 
            onClick={ () => capturarID( prod.id ) }
            >
              Borrar
          </button>
      </th>
    </tr>
  );
};

export default Producto;
