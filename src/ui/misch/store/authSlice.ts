import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
 
}

function loadStateFromLocalStorage() : AuthState {
  const token = localStorage.getItem("token");
 
  return {
    token: token ?? null
  }
}

const initialState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      
      localStorage.setItem("token", action.payload.token);
     
    },
    logout(state) {
      state.token = null;
    
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
