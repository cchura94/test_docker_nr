import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import productoService from "../../../services/producto.service";
import Modal from "../../../components/Modal";
import categoriaService from "../../../services/categoria.service";
import Categoria from "./Categoria";


const Producto = () => {

    const [productos, setProductos] = useState([])

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [producto, setProducto] = useState({})
    const [categorias, setCategorias] = useState([])
    const [modalOpenImagen, setModalOpenImagen] = useState(false)
    const [imagen, setImagen] = useState(null)

    const columnas = [
        { key: "id", label: "COD" },
        { key: "nombre", label: "NOMBRE PRODUCTO" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "STOCK" },
        { key: "Categorium.nombre", label: "Categoria" },
    ]


    useEffect(() => {

        getProductos()
        getCategorias()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState => ({
            ...prevState,
            [name]: value
        })))
    }


    const getProductos = async (nroPage = 1, limit = 5) => {
        setPage(nroPage)
        const { data } = await productoService.listar(nroPage, limit)
        setProductos(data.rows);
        setTotal(data.count)
    }

    const getCategorias = async () => {
        const { data } = await categoriaService.listar()
        setCategorias(data)
    }

    const guardarProducto = async (e) => {
        e.preventDefault()

        if(producto.id){
            const {data} = await productoService.mofificar(producto.id, producto)

        }else{

            const {data} = await productoService.guardar(producto)
        }
        
        getProductos()
        setModalOpen(false)
    }

    const editarModal = (datos) => {
        setProducto(datos);
        setModalOpen(true)
    }

    const editarModalImagen = (datos) => {
        setProducto(datos)
        setModalOpenImagen(true)
    }

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];

        setImagen(file)

    }

    const guardarImagenProducto = (e) => {
        e.preventDefault();
        const fd = new FormData()
        fd.append("imagen", imagen)
        productoService.actualizarImagen(producto.id, fd)

        getProductos()
        setModalOpenImagen(false)
    }

    return (
        <>
        <button className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" onClick={() => setModalOpen(true)}>Nuevo Producto</button>
            
            <TablePagination datos={productos} total={total} columnas={columnas} page={page} fetchData={getProductos} handleEdit={editarModal} handleShow={true} handleEditImagen={editarModalImagen}></TablePagination>

            <Modal titulo="Nuevo Producto" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={(e) => guardarProducto(e)}>

                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-gray-600 text-sm font-medium mb-2">Nombre</label>
                        <input type="text" id="nom" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="nombre" value={producto.nombre} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pr" className="block text-gray-600 text-sm font-medium mb-2">Precio</label>
                        <input type="text" id="pr" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="precio" value={producto.precio} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="st" className="block text-gray-600 text-sm font-medium mb-2">Stock</label>
                        <input type="text" id="st" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="stock" value={producto.stock} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="det">Descripción</label>
                        <input type="text" id="det" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="descripcion" value={producto.descripcion} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cat" className="block text-gray-600 text-sm font-medium mb-2">Categoria</label>
                        {/*JSON.stringify(producto)*/}
                        {categorias.map((cat) => (
                            <div>
                                <input type="radio" id={`cat-${cat.id}`} name="categoriaId" value={cat.id} onChange={handleChange} />
                                <label htmlFor={`cat-${cat.id}`}>{cat.nombre}</label>

                            </div>
                        ))}
                    </div>
                    <input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
                </form>
            </Modal>

            <Modal titulo="Actualizar Imagen" modalOpen={modalOpenImagen} setModalOpen={setModalOpenImagen}>
                <img src={`http://127.0.0.1:3000/`+producto.imagen} alt="" />
                <form onSubmit={(e) => guardarImagenProducto(e)}>
                    <div className="mb-4">
                        <label htmlFor="archivo" className="block text-gray-600 text-sm font-medium mb-2">Archivo</label>
                        <input type="file" id="archivo" accept="image/*" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" onChange={handleChangeImagen} />
                    </div>
                    <input type="submit" value="Actualizar Imagen" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
                </form>
            </Modal>
        </>
    )

}

export default Producto;