import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  preferredLanguage?: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Async thunks for user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await userService.getUserProfile(userId);
      // return response.data;
      
      // Mock response for now
      return {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main St, Mumbai, India',
        preferredLanguage: 'en',
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await userService.updateUserProfile(profileData);
      // return response.data;
      
      // Mock response for now
      return {
        ...profileData,
        id: profileData.id || '1',
        updatedAt: new Date().toISOString(),
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = { ...state.profile, ...action.payload } as UserProfile;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;