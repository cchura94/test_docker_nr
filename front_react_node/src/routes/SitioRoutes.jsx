import SitioLayout from "../layouts/SitioLayout";
import Login from "./../views/auth/Login"
import Registro from "./../views/auth/Registro"

const SitioRoutes = {
    path: '/',
    element: <SitioLayout />,
    children:[
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'registro',
            element: <Registro></Registro>
        }
    ]
}

export default SitioRoutes;