import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  userRole: 'customer' | 'worker' | 'admin' | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  userRole: null,
};

// Async thunks for authentication
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await authService.login(email, password);
      // return response.data;
      
      // Mock response for now
      return {
        user: { id: '1', name: 'Test User', email },
        token: 'mock-token-12345',
        userRole: 'customer' as const,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, name, role }: { email: string; password: string; name: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      // This will be replaced with actual API call
      // const response = await authService.register(email, password, name, role);
      // return response.data;
      
      // Mock response for now
      return {
        user: { id: '1', name, email },
        token: 'mock-token-12345',
        userRole: role as 'customer' | 'worker' | 'admin',
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string; userRole: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userRole = action.payload.userRole as AuthState['userRole'];
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
    });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;