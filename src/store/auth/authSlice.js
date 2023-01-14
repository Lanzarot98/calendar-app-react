import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'template',
  initialState: {
    status: 'checking', // 'authenticated', 'not-authenticated',
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onchecking: ( state ) => {
      state.status       = 'checking';
      state.user         = {};
      state.errorMessage = undefined;
    },
    onLogin: ( state, { payload } ) => {
        state.status = 'authenticated';
        state.user   = payload;
        state.errorMessage = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onchecking, onLogin } = authSlice.actions;
