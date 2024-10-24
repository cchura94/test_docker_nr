import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import productoService from "../../../services/producto.service";
import pedidoService from "../../../services/pedido.service";
import Modal from "../../../components/Modal";

const NuevoPedido = () => {

    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [carrito, setCarrito] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState({});
    const [modalOpen, setModalOpen] = useState(false) 
    const [cliente, setCliente] = useState({}) 


    useEffect(() => {
        listarProducto()
    }, [])

    const columnas = [
        {key: "id", label: "ID"},
        {key: "nombre", label: "NOMBRE"},
        {key: "precio", label: "PRECIO"},
        {key: "stock", label: "STOCK"},
        {key: "Categorium.nombre", label: "CATEGORIA"},
    ]
    

    const listarProducto = async (nroPage = 1) => {
        try {
            setPage(nroPage);
            const {data} = await productoService.listar(nroPage, 10, '')
            setProductos(data.rows)
            setTotal(data.count)

        } catch (error) {
            
        }
    }

    const handleAddCarrito = (data) => {
        const {id, nombre, precio} = data;
        setCarrito([...carrito, {productoId: id, nombre: nombre, precio: precio, cantidad: 1}])
    }

    const buscarCliente = async (e) => {
        const {data} = await pedidoService.buscarCliente(e.target.value)

        if(data.cliente){
            console.log(data.cliente)
            setClienteSeleccionado(data.cliente[0])
        }else{
            setClienteSeleccionado({})
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    const guardarCliente = async (e) => {
        e.preventDefault()
        const {data} = await pedidoService.guardarCliente(cliente)
        setClienteSeleccionado(data.cliente)

        setModalOpen(false)
    }
    
    const guardarPedido = async () => {

        let p =  {
            clienteId: clienteSeleccionado.id,
            productos: [
                {productoId: 3, cantidad: 1},
                {productoId: 7, cantidad: 3}
            ]
        }

        carrito.forEach((c) => {
            p.productos.push({productoId: c.productoId, cantidad: c.cantidad})
        })

        await pedidoService.guardar(p);
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="bg-white p-4 rounded shadow">
                        <TablePagination columnas={columnas} datos={productos} fetchData={listarProducto} page={page} total={total} handleAddCarrito={handleAddCarrito}></TablePagination>
                    </div>
                </div>
                <div className="md:cols-span-1 grid gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <div className="overflow-x-auto">

                            <table className="table-auto w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NOMBRE</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PRECIO</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CANTIDAD</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ACCION</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {carrito.map(prod => (
                                    <tr key={prod.productoId}>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.nombre}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.precio}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.cantidad}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">

                                        </td><button onClick={() => handleAddCarrito(res)} className="mx-1 py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h1>CLIENTE</h1>
                            <input type="text" onChange={(e) => buscarCliente(e)} placeholder="buscar por ci" />
                            <button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setModalOpen(true)}>NUEVO CLIENTE</button>
                            <hr />
                            {clienteSeleccionado?.id && 
                                <div>
                                    <h2>NOMBRE COMPLETO: {clienteSeleccionado.nombre_completo}</h2>
                                    <h2>CI/NIT: {clienteSeleccionado.ci_nit}</h2>
                                    <h2>TELEFONO: {clienteSeleccionado.telefono}</h2>
                                </div>
                            }

                        </div>

                        <div className="bg-white p-4 rounded shadow">
                        <button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => guardarPedido()}>Registrar Pedido</button>
                            

                        </div>
                    </div>
                </div>

            </div>
            <Modal titulo="Nuevo Cliente" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={(e) => guardarCliente(e)}>
                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-gray-600 text-sm font-medium mb-2">Nombre Completo</label>
                        <input type="text" id="nom" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="nombre_completo" value={cliente.nombre_completo} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pr" className="block text-gray-600 text-sm font-medium mb-2">CI/NIT</label>
                        <input type="text" id="pr" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="ci_nit" value={cliente.ci_nit} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="st" className="block text-gray-600 text-sm font-medium mb-2">Telefono</label>
                        <input type="text" id="st" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="telefono" value={cliente.telefono} onChange={handleChange} />
                    </div>

                    <input type="submit" value="Guardar Cliente" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
                </form>
            </Modal>
        </>
    )
}

export default NuevoPedido;
