import { useEffect, useState } from "react";
import categoriaService from "../../../services/categoria.service";
import Modal from "../../../components/Modal";

const Categoria = () => {
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({ nombre: '', detalle: '' })
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        getCategorias()
    }, [])

    const getCategorias = async () => {
        const { data } = await categoriaService.listar()
        setCategorias(data)
    }

    const guardarCategoria = async (e) => {
        e.preventDefault()

        await categoriaService.guardar(categoria)

        getCategorias()
        setModalOpen(false)

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prevState => ({
            ...prevState,
            [name]: value
        })))

    }


    return (
        <>


            {/*JSON.stringify(categorias)*/}
            <button className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" onClick={() => setModalOpen(true)}>Nueva Categoria</button>
            {/*JSON.stringify(categoria)*/}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">CORREO</th>
                        <th className="py-2 px-4 border-b">USUARIO</th>
                        <th className="py-2 px-4 border-b">ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((cat) => (
                        <tr key={cat.id}>
                            <td className="py-2 px-4 border-b">{cat.id}</td>
                            <td className="py-2 px-4 border-b">{cat.nombre}</td>
                            <td className="py-2 px-4 border-b">{cat.detalle}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => editarUsuario(cat)}>editar</button>
                                <button>eliminar</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

            <Modal titulo="Nueva Categoria" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                
                <form onSubmit={(e) => guardarCategoria(e)}>

                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-gray-600 text-sm font-medium mb-2">Nombre</label>
                        <input type="text" id="nom" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="nombre" value={categoria.nombre} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="det">Detalle</label>
                        <input type="text" id="det" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="detalle" value={categoria.detalle} onChange={handleChange} />
                    </div>
                    <input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
                </form>

            </Modal>


        </>
    )
}

export default Categoria;