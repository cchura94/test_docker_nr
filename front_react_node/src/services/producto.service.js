import api from "./api"

const productoService = {
    listar: (page=1, limit=10, q='') => {
        return api.get(`/v1/admin/producto?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar: (datos) => {
        return api.post("/v1/admin/producto", datos);
    },
    mostrar: (id) => {
        return api.get(`/v1/admin/producto/${id}`);
    },
    mofificar: (id, datos) => {
        return api.put(`/v1/admin/producto/${id}`, datos);
    },
    eliminar: () => {
        return api.delete(`/v1/admin/producto/${id}`);
    },
    actualizarImagen: (id, fd) => {
        return api.post(`/v1/admin/producto/${id}/actualizar-imagen`, fd)
    }
}

export default productoService;