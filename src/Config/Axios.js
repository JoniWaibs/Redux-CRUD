//17
//creando un cliente de axios
//instalar e importar axios
import axios from 'axios'

//construyendo el cliente
const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000/'
})

//exportar el cliente e importarlo en el action
export default clienteAxios;