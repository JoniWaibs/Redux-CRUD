import React from 'react'
import Header from './Componets/Header'
import Productos from './Componets/Productos'
import NuevoProducto from './Componets/NuevoProducto'
import EditarProducto from './Componets/EditarProducto'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'


//6
//redux
//importar provider y store
import { Provider } from 'react-redux' 
import store from './Store'

function App() {
  return (
    <Router>
      <Provider store={store}>

      <Header/>

      <div className="container">
        <Switch>
            
          <Route exact path="/" component={() => <Productos/>}/>

          <Route exact path="/productos/nuevo" component={() => <NuevoProducto/>}/>

          <Route exact path="/productos/editar/:id" component={() => <EditarProducto/>}/>

        </Switch>
      </div>

      </Provider>
    </Router>
  );
}

export default App;
