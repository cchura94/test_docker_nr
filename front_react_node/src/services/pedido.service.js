import api from "./api"

const pedidoService = {
    listar: (page=1, limit=10, q='') => {
        return api.get(`/v1/admin/pedido?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar: (datos) => {
        return api.post("/v1/admin/pedido", datos);
    },
    mostrar: (id) => {
        return api.get(`/v1/admin/pedido/${id}`);
    },
    buscarCliente: (q) => {
        return api.get(`/v1/admin/pedido/buscar-cliente?q=${q}`)
    },
    guardarCliente: (datos) => {
        return api.post(`/v1/admin/pedido/nuevo-cliente`, datos)
    }
}

export default pedidoService;