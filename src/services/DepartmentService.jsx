import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Department", { params });
};

const get = async (deptNo) => {
    return await apiClient.get(`/Department/${deptNo}`);
};

const create = async (data) => {
    return await apiClient.post("/Department", data);
};

const update = async (deptNo, data) => {
    return await apiClient.put(`/Department/${deptNo}`, data);
};

const remove = async (deptNo) => {
    return await apiClient.delete(`/Department/${deptNo}`);
};

const getEmployee = async (deptNo) => {
    return await apiClient.get(`/Department/${deptNo}/employees`);
}

const getSameDepartment = async (params) => {
    return await apiClient.get("Employee/same-department", {params});
};

const DepartmentService = {
    getAll,
    get,
    create,
    update,
    remove,
    getEmployee,
    getSameDepartment   
};
    
export default DepartmentService;