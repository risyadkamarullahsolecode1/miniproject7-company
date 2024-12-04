import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Dependent", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Dependent/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Dependent", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Dependent/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Dependent/${id}`);
};

const getDependentsByEmployee = async (empno) => {
    return await apiClient.get(`/Dependent/dependent/${empno}`)
}

const DependantService = {
    getAll,
    get,
    create,
    update,
    remove,
    getDependentsByEmployee
};
    
export default DependantService;