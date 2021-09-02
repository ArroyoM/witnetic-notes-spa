import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, HTTP_STATUS } from "../../config/apiConfig";

export const singInAsync = createAsyncThunk(
  "user/singInAsync",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL.domain}/Token`, user, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error.error });
      }
    }
  }
);

export const singUpAsync = createAsyncThunk(
  "user/singUpAsync",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL.domain}/User/register`, user, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error.error });
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    errors: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singInAsync.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(singInAsync.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.errors = null;
        state.user = action.payload;
      })
      .addCase(singInAsync.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.errors = null;
        if (action.payload.error.status === 404) {
          state.errors = { noFund: action.payload.error.title };
        } else {
          if (action.payload) {
            state.errors =
              action.payload.error === undefined
                ? { noConnection: "No hay conexion al servidor" }
                : action.payload.error.errors;
          } else {
            state.errors = { erroNoDefinite: action.error.message };
          }
        }
      })
      .addCase(singUpAsync.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(singUpAsync.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.errors = null;
        //state.user = action.payload;
      })
      .addCase(singUpAsync.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.errors = null;
        if (action.payload) {
          state.errors = action.payload.error.errors;
        } else {
          state.errors = { erroNoFund: action.error.message };
        }
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
