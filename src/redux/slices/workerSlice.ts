import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface WorkerProfile {
  id: string;
  userId: string;
  name: string;
  skills: string[];
  categories: string[];
  experience: number; // in years
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  isAvailable: boolean;
  location: string;
  coverageArea: string[];
  profileImage?: string;
  gallery?: string[];
  bio?: string;
}

interface WorkerState {
  workers: WorkerProfile[];
  selectedWorker: WorkerProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkerState = {
  workers: [],
  selectedWorker: null,
  isLoading: false,
  error: null,
};

// Async thunks for workers
export const fetchWorkers = createAsyncThunk(
  'worker/fetchWorkers',
  async ({ category, location }: { category?: string; location?: string }, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await workerService.getWorkers(category, location);
      // return response.data;
      
      // Mock response for now
      return [
        {
          id: '1',
          userId: 'user1',
          name: 'Rajesh Kumar',
          skills: ['Plumbing', 'Pipe Fitting', 'Bathroom Repair'],
          categories: ['Plumbing'],
          experience: 5,
          hourlyRate: 300,
          rating: 4.7,
          totalReviews: 24,
          isVerified: true,
          isAvailable: true,
          location: 'Mumbai, Maharashtra',
          coverageArea: ['Andheri', 'Bandra', 'Juhu'],
          bio: 'Professional plumber with 5 years of experience in residential and commercial plumbing.',
        },
        {
          id: '2',
          userId: 'user2',
          name: 'Amit Singh',
          skills: ['Electrical Wiring', 'Circuit Repair', 'Installation'],
          categories: ['Electrical'],
          experience: 7,
          hourlyRate: 350,
          rating: 4.9,
          totalReviews: 36,
          isVerified: true,
          isAvailable: true,
          location: 'Mumbai, Maharashtra',
          coverageArea: ['Dadar', 'Worli', 'Lower Parel'],
          bio: 'Certified electrician with expertise in residential and commercial electrical systems.',
        },
      ] as WorkerProfile[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workers');
    }
  }
);

export const fetchWorkerById = createAsyncThunk(
  'worker/fetchWorkerById',
  async (workerId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await workerService.getWorkerById(workerId);
      // return response.data;
      
      // Mock response for now
      return {
        id: workerId,
        userId: 'user1',
        name: 'Rajesh Kumar',
        skills: ['Plumbing', 'Pipe Fitting', 'Bathroom Repair'],
        categories: ['Plumbing'],
        experience: 5,
        hourlyRate: 300,
        rating: 4.7,
        totalReviews: 24,
        isVerified: true,
        isAvailable: true,
        location: 'Mumbai, Maharashtra',
        coverageArea: ['Andheri', 'Bandra', 'Juhu'],
        bio: 'Professional plumber with 5 years of experience in residential and commercial plumbing.',
        gallery: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ],
      } as WorkerProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch worker');
    }
  }
);

const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setSelectedWorker: (state, action: PayloadAction<WorkerProfile>) => {
      state.selectedWorker = action.payload;
    },
    clearSelectedWorker: (state) => {
      state.selectedWorker = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Workers
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Worker By Id
    builder
      .addCase(fetchWorkerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedWorker = action.payload;
      })
      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedWorker, clearSelectedWorker } = workerSlice.actions;

export const selectAllWorkers = (state: RootState) => state.worker.workers;
export const selectSelectedWorker = (state: RootState) => state.worker.selectedWorker;
export const selectWorkerLoading = (state: RootState) => state.worker.isLoading;
export const selectWorkerError = (state: RootState) => state.worker.error;

export default workerSlice.reducer;