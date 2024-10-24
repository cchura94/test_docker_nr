import { useEffect, useState } from "react"
import pedidoService from "../../../services/pedido.service"
import TablePagination from "../../../components/TablePagination"
import Modal from "../../../components/Modal"

import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const ListaPedido = () => {

    const [pedidos, setPedidos] = useState([])

    const [pedido, setPedido] = useState({})
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    const columnas = [
        { key: "id", label: "id" },
        { key: "fecha", label: "Fecha" },
        { key: "observacion", label: "observacion" },
        { key: "estado", label: "estado" },
        { key: "Cliente.nombre_completo", label: "Cliente"}
    ]

    useEffect(() => {

        getPedidos()
    }, []);

    const getPedidos = async (nroPage = 1, limit = 5) => {
        setPage(nroPage)
        const { data } = await pedidoService.listar(nroPage, limit)
        console.log(data)
        setPedidos(data.rows);
        setTotal(data.count)
    }

    const handleShow = (data) => {
        console.log(JSON.stringify(data))
        setPedido(data)
        setModalOpen(true)

    }

    const handlePDF = (data) => {
        

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(18)
    doc.text("Detalle de Pedido", 14, 20);

    const fecha = new Date(data.fecha).toLocaleDateString();
    doc.setFontSize(12)
    doc.text(`Fecha: ${fecha}`, 14, 30);

    
    doc.text(`Cliente: ${data.Cliente?.nombre_completo}`, 14, 50);
    doc.text(`CI/NIT: ${data.Cliente?.ci_nit}`, 14, 60);
    doc.text(`Telefono ${data.Cliente?.telefono}`, 14, 70);

    // detalle de pedido

    const detalle = data.Productos.map((producto) => [producto.nombre, producto.PedidoProducto.cantidad, `$${producto.precio}`])

    doc.autoTable({
        startY: 80,
        head: [['PRODUCTO', 'CANTIDAD', 'PRECIO']],
        body: detalle
    })



    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    

    // doc.save("a4.pdf");

    }

    return <>
        <TablePagination datos={pedidos} total={total} columnas={columnas} page={page} fetchData={getPedidos} handleShow={handleShow} handlePDF={handlePDF}></TablePagination>

        <Modal titulo="Detalles Pedido" modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="max-w-md mx-auto p-4 border border-gray-400">
                <div className="flex justify-between">
                    <h1 className="text-lg font-bold">Detalle Pedido</h1>
                    <p className="text-sm">Fecha Pedido: {new Date(pedido.fecha).toLocaleDateString()}</p>
                </div>
                <hr className="my-2" />
                <div className="mt-4">
                    <p className="font-bold"> Cliente: </p>
                    <p>{pedido.Cliente?.nombre_completo}</p>
                    <p>CI/NIT: {pedido.Cliente?.ci_nit}</p>
                    <p>Telefono{pedido.Cliente?.telefono}</p>
                </div>

                <div className="mt-6">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Cantidad</th>
                                <th className="px-4 py-2">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedido.Productos?.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="px-4 py-2">{producto.nombre}</td>
                                    <td className="px-4 py-2">{producto.PedidoProducto.cantidad}</td>
                                    <td className="px-4 py-2">{producto.precio}</td>
                                </tr>
                            ))
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="font-bold px-4 py-2">Total:</td>
                                <td className="font-bold px-4 py-2">
                                    {pedido.Productos?.reduce(
                                        (total, producto) => total + parseFloat(producto.precio), 0
                                    )}
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </Modal>
        
    
    </>
}

export default ListaPedido