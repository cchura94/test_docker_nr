import api from "./api"

const categoriaService = {
    listar: () => {
        return api.get(`/v1/admin/categoria`);
    },
    guardar: (datos) => {
        return api.post("/v1/admin/categoria", datos);
    },
    mostrar: (id) => {
        return api.get(`/v1/admin/categoria/${id}`);
    },
    mofificar: (id, datos) => {
        return api.put(`/v1/admin/categoria/${id}`, datos);
    },
    eliminar: () => {
        return api.delete(`/v1/admin/categoria/${id}`);
    }
}

export default categoriaService;