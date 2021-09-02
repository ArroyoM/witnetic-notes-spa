import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, HTTP_STATUS } from "../../config/apiConfig";

export const deleteBookAsyns = createAsyncThunk(
  "book/deleteBookAsyns",
  async (id, thunkAPI) => {
    const JwtToken = thunkAPI.getState().user.user.tokenJwt;

    try {
      const response = await axios.delete(`${URL.domain}/Book/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({ error: error.response });
      } else {
        return thunkAPI.rejectWithValue({ error: error.error });
      }
    }
  }
);

export const createBookAsyns = createAsyncThunk(
  "book/createBookAsyns",
  async (book, thunkAPI) => {
    const id = thunkAPI.getState().user.user.id;
    const JwtToken = thunkAPI.getState().user.user.tokenJwt;

    const newBook = { ...book, idUser: id, idBook: 0 };

    try {
      const response = await axios.post(`${URL.domain}/Book/`, newBook, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${JwtToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({ error: error.response });
      } else {
        return thunkAPI.rejectWithValue({ error: error.error });
      }
    }
  }
);

export const allBooksAsync = createAsyncThunk(
  "book/allBooksAsync",
  async (_, thunkAPI) => {
    const id = thunkAPI.getState().user.user.id;
    const JwtToken = thunkAPI.getState().user.user.tokenJwt;

    try {
      const response = await axios.get(`${URL.domain}/Book/user/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${JwtToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({ error: error.response });
      } else {
        return thunkAPI.rejectWithValue({ error: error.error });
      }
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: null,
    status: "idle",
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allBooksAsync.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(allBooksAsync.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.errors = null;
        state.book = action.payload;
      })
      .addCase(allBooksAsync.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.errors = null;
        if (action.payload) {
          if (action.payload.error === undefined) {
            state.errors = { noConnection: "No hay conexion al servidor" };
            state.books = null;
          }
          if (action.payload.error) {
            if (action.payload.error.status === 401) {
              try {
                localStorage.setItem(
                  "errors",
                  JSON.stringify({ error: "401" })
                );
              } catch (error) {
                localStorage.removeItem("errors");
              }
              state.errors = { unAuthorized: "No esta autorizado" };
            }
            ///validate more errors
          }
        } else {
          state.errors = { erroNoDefinite: action.error.message };
        }
      })
      .addCase(createBookAsyns.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(createBookAsyns.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.errors = null;
        state.book.data.push(action.payload);
      })
      .addCase(createBookAsyns.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.errors = null;
        if (action.payload) {
          if (action.payload.error === undefined) {
            state.errors = { noConnection: "No hay conexion al servidor" };
            state.books = null;
          }
          if (action.payload.error) {
            if (action.payload.error.status === 401) {
              try {
                localStorage.setItem(
                  "errors",
                  JSON.stringify({ error: "401" })
                );
              } catch (error) {
                localStorage.removeItem("errors");
              }
              state.errors = { unAuthorized: "No esta autorizado" };
            }
            ///validate more errors
          }
        } else {
          state.errors = { erroNoDefinite: action.error.message };
        }
      })
      .addCase(deleteBookAsyns.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(deleteBookAsyns.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.errors = null;
        ///It's not recommended action.meta.arg use data the backend
        state.book.data = state.book.data.filter(
          (item) => item.idBook !== action.meta.arg
        );
      })
      .addCase(deleteBookAsyns.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.errors = null;
        if (action.payload) {
          if (action.payload.error === undefined) {
            state.errors = { noConnection: "No hay conexion al servidor" };
            state.books = null;
          }
          if (action.payload.error) {
            if (action.payload.error.status === 401) {
              try {
                localStorage.setItem(
                  "errors",
                  JSON.stringify({ error: "401" })
                );
              } catch (error) {
                localStorage.removeItem("errors");
              }
              state.errors = { unAuthorized: "No esta autorizado" };
            }
            ///validate more errors
          }
        } else {
          state.errors = { erroNoDefinite: action.error.message };
        }
      });
  },
});

export default bookSlice.reducer;
