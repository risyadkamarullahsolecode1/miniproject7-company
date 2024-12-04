import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Workson", { params });
};

const get = async (empNo, projNo) => {
    return await apiClient.get(`/Workson/${empNo}/${projNo}`);
};

const create = async (data) => {
    return await apiClient.post("/Workson", data);
};

const update = async (empno, projno, data) => {
    return await apiClient.put(`/Workson/${empno}/${projno}`, data);
};

const remove = async (empno, projno) => {
    return await apiClient.delete(`/Workson/${empno}/${projno}`);
};

const assignment = async (projNo) => {
    return await apiClient.get(`/Workson/${projNo}/projects`);
}

const WorksOnService = {
    getAll,
    get,
    create,
    update,
    remove,
    assignment
};
    
export default WorksOnService;