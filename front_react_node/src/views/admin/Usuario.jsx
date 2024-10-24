import { useEffect, useState } from "react";
import usuarioService from "../../services/usuario.service";
import Modal from "../../components/Modal";
import TablePagination from "../../components/TablePagination";


const Usuario = () => {

    const [usuarios, setUsuarios] = useState([])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usuario_id, setUsuarioId] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const columnas = [
        {key: "id", label: "COD"},
        {key: "username", label: "NOMBRE"},
        {key: "email", label: "CORREO"}
        
    ]

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (token) {
            const exp = JSON.parse(atob(token.split(".")[1])).exp;
            const expiration = new Date(exp).getTime();
            const actual = Math.floor(Date.now() / 1000)

            if (expiration < actual + 10) {
                console.log("ha expirado");
            } else {
                console.log("1 minuto: ", expiration - actual);
            }
        }


        getUsuarios()
    }, [])

    const getUsuarios = async (nroPage = 1, limit=5) => {
        setPage(nroPage)
        const { data } = await usuarioService.listar(nroPage, limit)
        setUsuarios(data.rows);
        setTotal(data.count)
    }

    const guardarUsuario = async (e) => {
        console.log("guardando...")
        e.preventDefault();
        try {
            if (usuario_id) {
                await usuarioService.mofificar(usuario_id, { username: name, email, password });
            } else {

                await usuarioService.guardar({ username: name, email, password });
            }
            getUsuarios()
            setName("")
            setEmail("")
        } catch (error) {
            console.log(error);
        }
    }

    const editarUsuario = (user) => {
        console.log("editando---", user.username)
        setName(user.username);
        setEmail(user.email);
        setUsuarioId(user.id)
    }

    return (
        <>
            <h1>Lista de Usuarios</h1>
            {/*JSON.stringify(usuarios)*/}

            <TablePagination datos={usuarios} total={total} columnas={columnas} page={page} fetchData={getUsuarios} handleShow={true}></TablePagination>


            <button className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" onClick={() => setModalOpen(true)}>Nuevo Usuario</button>

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
                    {usuarios.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => editarUsuario(user)}>editar</button>
                                <button>eliminar</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

            <Modal titulo="Nuevo Usuario" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={(e) => guardarUsuario(e)}>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">Nombre</label>
                        <input type="text" id="name" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={name} onChange={e => setName(e.target.value)} required />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="co">Correo</label>
                        <input type="email" id="co" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" id="pass" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" onChange={e => setPassword(e.target.value)} required />
                    </div>

                    <input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
                </form>

            </Modal>

        </>
    );
}

export default Usuario;