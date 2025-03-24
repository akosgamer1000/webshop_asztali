import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: string | null;
 
}

function loadStateFromLocalStorage() : AuthState {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return {
    token: token ?? null,
    userId: userId ?? null,

  }
}

const initialState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string, userId: string }>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;

      
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
     
    },
    logout(state) {
      state.token = null;
    
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;