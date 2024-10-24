import AdminLayout from "../layouts/AdminLayout";
import Perfil from "../views/admin/Perfil"
import Usuario from "../views/admin/Usuario";
import ListaPedido from "../views/admin/pedido/ListaPedido";
import NuevoPedido from "../views/admin/pedido/NuevoPedido";
import Categoria from "../views/admin/producto/Categoria";
import Producto from "../views/admin/producto/Producto";

const AdminRoutes = {
    path: '/',
    element: <AdminLayout />,
    children:[
        {
            path: 'perfil',
            element: <Perfil></Perfil>
        },
        {
            path: 'usuario',
            element: <Usuario></Usuario>
        },
        {
            path: 'categoria',
            element: <Categoria></Categoria>
        },
        {
            path: 'producto',
            element: <Producto></Producto>
        },
        {
            path: 'pedido/nuevo',
            element: <NuevoPedido></NuevoPedido>
        },
        ,
        {
            path: 'pedido',
            element: <ListaPedido></ListaPedido>
        }
    ]
}

export default AdminRoutes;