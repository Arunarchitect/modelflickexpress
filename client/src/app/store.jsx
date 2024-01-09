import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testApi } from '../services/testApi';
import { testApi1 } from '../services/testApi';  // Import the second API
import { testApi2 } from '../services/testApi';  // Import the third API
import { jobApi } from '../services/jobApi';  // Import the Job APi
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    [testApi.reducerPath]: testApi.reducer,
    auth: authReducer,
    user:userReducer,
    [testApi1.reducerPath]: testApi1.reducer,  // Add the reducer path for the second API
    [jobApi.reducerPath]: jobApi.reducer,  // Add the reducer path for the job API
    [testApi2.reducerPath]: testApi2.reducer,  // Add the reducer path for the second API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware, testApi1.middleware, jobApi.middleware, testApi2.middleware,),  // Add middleware for the second API
});

// setupListeners as you have it, no changes needed
setupListeners(store.dispatch);
