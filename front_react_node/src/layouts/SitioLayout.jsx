import { NavLink, Outlet } from "react-router-dom"

const SitioLayout = () => {
    return (
        <>
        <h1>Layout para Sitio Web</h1>
        <NavLink to="/"> INICIO </NavLink> |
        <NavLink to="/login">INGRESAR</NavLink>

            <Outlet />
        </>
    )
}

export default SitioLayout;