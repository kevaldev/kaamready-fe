import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Booking {
  id: string;
  customerId: string;
  workerId: string;
  serviceType: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled' | 'disputed';
  date: string;
  time: string;
  address: string;
  instructions?: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'released' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

// Async thunks for bookings
export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (userId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await bookingService.getUserBookings(userId);
      // return response.data;
      
      // Mock response for now
      return [
        {
          id: '1',
          customerId: userId,
          workerId: 'worker1',
          serviceType: 'Plumbing',
          status: 'completed',
          date: '2023-12-15',
          time: '14:00',
          address: '123 Main St, Mumbai, India',
          instructions: 'Fix the kitchen sink',
          price: 500,
          paymentStatus: 'released',
          createdAt: '2023-12-10T10:00:00Z',
          updatedAt: '2023-12-15T15:00:00Z',
        },
        {
          id: '2',
          customerId: userId,
          workerId: 'worker2',
          serviceType: 'Electrical',
          status: 'pending',
          date: '2023-12-20',
          time: '10:00',
          address: '123 Main St, Mumbai, India',
          instructions: 'Fix the living room lights',
          price: 700,
          paymentStatus: 'pending',
          createdAt: '2023-12-15T10:00:00Z',
          updatedAt: '2023-12-15T10:00:00Z',
        },
      ] as Booking[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await bookingService.createBooking(bookingData);
      // return response.data;
      
      // Mock response for now
      return {
        ...bookingData,
        id: Math.random().toString(36).substring(2, 9),
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Booking;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'booking/updateStatus',
  async ({ bookingId, status }: { bookingId: string; status: Booking['status'] }, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call
      // const response = await bookingService.updateBookingStatus(bookingId, status);
      // return response.data;
      
      // Mock response for now
      return {
        id: bookingId,
        status,
        updatedAt: new Date().toISOString(),
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking status');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Bookings
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Booking Status
    builder
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = {
            ...state.bookings[index],
            ...action.payload,
          };
        }
        if (state.currentBooking?.id === action.payload.id) {
          state.currentBooking = {
            ...state.currentBooking,
            ...action.payload,
          };
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;

export const selectAllBookings = (state: RootState) => state.booking.bookings;
export const selectCurrentBooking = (state: RootState) => state.booking.currentBooking;
export const selectBookingLoading = (state: RootState) => state.booking.isLoading;
export const selectBookingError = (state: RootState) => state.booking.error;

export default bookingSlice.reducer;