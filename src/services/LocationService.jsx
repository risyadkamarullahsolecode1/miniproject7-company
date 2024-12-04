import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Location", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Location/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Location", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Location/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Location/${id}`);
};

const LocationService = {
    getAll,
    get,
    create,
    update,
    remove
};
    
export default LocationService;