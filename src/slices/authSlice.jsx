import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  isError: false,
  message: '' 
};

// Register user
export const register = createAsyncThunk(
    ' Auth/register',
    async (userData, thunkAPI) => {
      try {
        const response = await AuthService.register(userData);
        console.log("Registration Response: ", response);
        return response;
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error("Registration Error: ", message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

// Login user
export const login = createAsyncThunk(
'Auth/login',
async (userData, thunkAPI) => {
    try {
    return await AuthService.login(userData);
    } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
    }
}
);

// Logout user
export const logout = createAsyncThunk(
'Auth/logout', 
async (_, thunkAPI) => {
    try {
    return await AuthService.logout();
    } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
    }
}
);

export const refreshToken = createAsyncThunk(
  'Auth/refresh-token',
  async (_, { rejectWithValue }) => {
    try {      
      const response= await AuthService.refreshToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

  
const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
    reset: (state) => {
    state.isLoading = false; state.isSuccess = false;
    state.isError = false; state.message = '';
    },
},
extraReducers: (builder) => {
    builder
    // Register cases
    .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      
        // Save user details if provided by the API
        if (action.payload) {
          state.user = action.payload; // Assuming the backend sends user data
          localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user data
        }
      })      
    .addCase(register.rejected, (state, action) => {
        state.isLoading = false; state.isError = true;
        state.message = action.payload.message;
    })
    // Login cases      
    .addCase(login.fulfilled, (state, action) => {       
        state.isLoading = false; state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload
    })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false; state.isError = true;
        state.isAuthenticated = false;
        state.message = action.payload.message; state.user = null;
    })
    // Logout cases
    .addCase(logout.fulfilled, (state) => {
        state.user = null;
    })
    // refreh token
    .addCase(refreshToken.fulfilled, (state) => {
      state.isAuthenticated = true;    
   })
   .addCase(refreshToken.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;    
   });
},
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
  