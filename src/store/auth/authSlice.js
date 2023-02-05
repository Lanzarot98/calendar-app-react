import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'template',
  initialState: {
    status: 'checking', // 'authenticated', 'not-authenticated',
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
      state.status       = 'checking';
      state.user         = {};
      state.errorMessage = undefined;
    },
    onLogin: ( state, { payload } ) => {
        state.status = 'authenticated';
        state.user   = payload;
        state.errorMessage = undefined;
    },
    onLogout: ( state, { payload } ) => { // en este caso el payload que es lo que voy a enviar sería el string del error
      state.status = 'not-authenticated';
      state.user   = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: ( state ) => { // limpiar el mensaje de error
      state.errorMessage = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
