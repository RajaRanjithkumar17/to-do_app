import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthenticationPayload {
    [key: string]: string;
  }
  interface AuthState {
    [key: string]: any;
  }
  
  const initialState: AuthState = {};

  const authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
          setAuthentication: (state, action: PayloadAction<AuthenticationPayload>) => {
            state.authentication = action.payload;
          },
      
          clearAuthentication: (state) => {
            state.authentication = {
              isLogin: false,
              loginResponse: {},
            };
          },
        },
  })

  export const { setAuthentication, clearAuthentication } = authSlice.actions
  export default authSlice.reducer