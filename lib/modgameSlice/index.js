import BASE_URL_API from "@/constans/baseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  totalCount: 0,
  totalPages: 1,
  gameDetail: {},
  searchgame: {
    lists: [],
    totalCount: 0,
    totalPages: 1,
  },
};
export const getGameMod = createAsyncThunk(
  "game/fetchAll",
  async (params, thunkAPI) => {
    let page = params.page || 1;
    const response = await axios.get(`${BASE_URL_API}/modgames?page=${page}`);
    return response.data;
  }
);

export const getDetailGame = createAsyncThunk(
  "gameDetail/fetchAll",
  async (id, thunkAPI) => {
    const response = await axios.get(`${BASE_URL_API}/modgames/${id}`);
    return response.data.data;
  }
);

export const getSearchGame = createAsyncThunk(
  "searchgame/fetchAll",
  async (params, thunkAPI) => {
    let { k, page } = params;
    const response = await axios.get(
      `${BASE_URL_API}/modgames/searchgame?k=${k}&page=${page}`
    );
    return response.data;
  }
);

export const deleteGame = createAsyncThunk(
  "deletegame/fetchAll",
  async (id, thunkAPI) => {
    const response = await axios.delete(`${BASE_URL_API}/modgames/${id}`);
    if (response.status === 200) {
      return id;
    }
  }
);

export const postGame = createAsyncThunk(
  "postgame/fetchAll",
  async (params, thunkAPI) => {
    const response = await axios.post(`${BASE_URL_API}/modgames`,params);
    if (response.status === 201) {
      return response.data.data;
    }
  }
);

export const modgameSlice = createSlice({
  name: "game",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGameMod.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getDetailGame.fulfilled, (state, action) => {
        state.gameDetail = action.payload;
      })
      .addCase(getSearchGame.fulfilled, (state, action) => {
        state.searchgame.lists = action.payload.data;
        state.searchgame.totalCount = action.payload.totalCount;
        state.searchgame.totalPages = action.payload.totalPages;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.totalPages = Math.ceil((state.totalCount - 1) / state.lists)
        state.lists = state.lists.filter((item) => item.id !== action.payload);
        state.totalCount = state.totalCount - 1;
      })
      .addCase(postGame.fulfilled, (state, action) => {
        state.totalPages = Math.ceil((state.totalCount + 1) / state.lists.length)
        state.lists.unshift(action.payload)
        state.lists.pop()
        state.totalCount = state.totalCount + 1;
      });
  },
});

export const { increment, decrement, incrementByAmount } = modgameSlice.actions;

export default modgameSlice.reducer;
