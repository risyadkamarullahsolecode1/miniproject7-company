import apiClient from "../axiosconfig";

const getAll = async (params) => {
    return await apiClient.get("/Employee", { params });
};

const get = async (empNo) => {
    return await apiClient.get(`/Employee/${empNo}`);
};

const create = async (data) => {
    return await apiClient.post("/Employee", data);
};

const update = async (empNo, data) => {
    return await apiClient.put(`/Employee/update-employee-timestamp/${empNo}`, data);
};

const remove = async (empNo) => {
    return await apiClient.delete(`/Employee/${empNo}`);
};

const search = async (params) => {
    return await apiClient.get("/Employee/search", { params });
}

const deactivate = async (empno, reason) => {
    return await apiClient.put(`/Employee/deactivate/${empno}`, { reason });
}

const addDependent = async (empNo, data) => {
    console.log("Calling API with data:", data); // Log the input data
    try {
        const response = await apiClient.post(`/Employee/employees/${empNo}/dependents`, data);
        console.log("API Response:", response.data); // Log API response
        return response;
    } catch (error) {
        console.error("API Error:", error.response || error.message); // Log error
        throw error;
    }
};

const addDependentLogin = async (data) => {
    console.log("Calling API with data:", data); // Log the input data
    try {
        const response = await apiClient.post(`/Employee/dependents`, data);
        console.log("API Response:", response.data); // Log API response
        return response;
    } catch (error) {
        console.error("API Error:", error.response || error.message); // Log error
        throw error;
    }
};

const details = async (params) => {
    return await apiClient.get('/Employee/details-employee', { params });
}

const EmployeeService = {
    getAll,
    get,
    create,
    update,
    remove,
    search,
    deactivate,
    addDependent,
    addDependentLogin,
    details,
};
    
export default EmployeeService;