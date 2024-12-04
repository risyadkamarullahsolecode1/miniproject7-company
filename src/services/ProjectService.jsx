import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Project", { params });
};

const get = async (projNo) => {
    return await apiClient.get(`/Project/${projNo}`);
};

const create = async (data) => {
    return await apiClient.post("/Project", data);
};

const update = async (projNo, data) => {
    return await apiClient.put(`/Project/${projNo}`, data);
};

const remove = async (projNo) => {
    return await apiClient.delete(`/Project/${projNo}`);
};

const getDepartment = async (projno) => {
    return await apiClient.get(`/Project/${projno}/department`); // GET request to fetch associated department
};

const ProjectService = {
    getAll,
    get,
    create,
    update,
    remove,
    getDepartment,
};
    
export default ProjectService;