import BASE_URL_API from "@/lib/constans/baseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  totalCount: 0,
  totalPages: 1,
  gameDetail: {
    loading:true,
    error:false
  },
  perPage: 0,
  searchgame: {
    lists: [],
    totalCount: 0,
    totalPages: 1,
  },
  loading:true,
  error:false
};
export const getGameMod = createAsyncThunk(
  "game/fetchAll",
  async (params, thunkAPI) => {
    let page = params.page || 1;
    const response = await axios.get(`${BASE_URL_API}/modgames?page=${page}`);
    console.log('sdfdsff',response)
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
    const response = await axios.post(`${BASE_URL_API}/modgames`, params);
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
    // get list game
      .addCase(getGameMod.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
        state.loading = false;
        state.error = false;
      })
      .addCase(getGameMod.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // get detail game
      .addCase(getDetailGame.fulfilled, (state, action) => {
        state.gameDetail = action.payload;
        state.gameDetail.loading = false;
        state.gameDetail.error = false;
      })
      .addCase(getDetailGame.rejected, (state, action) => {
        state.gameDetail.loading = false;
        state.gameDetail.error = action.error.message;
      })
      // get search game
      .addCase(getSearchGame.fulfilled, (state, action) => {
        state.searchgame.lists = action.payload.data;
        state.searchgame.totalCount = action.payload.totalCount;
        state.searchgame.totalPages = action.payload.totalPages;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.lists = state.lists.filter((item) => item.id !== action.payload);
        state.totalCount -= 1;
        state.totalPages = Math.ceil((state.totalCount) / state.lists.length);
      })
      .addCase(postGame.fulfilled, (state, action) => {
        const newGame = action.payload;
        const currentLength = state.lists.length;
        state.lists.unshift(newGame);
        if (currentLength >= state.perPage) {
          state.lists.pop();
        }
        state.totalCount += 1;
        state.totalPages = Math.ceil((state.totalCount) / state.lists.length);
      });
  },
});

export const { increment, decrement, incrementByAmount } = modgameSlice.actions;

export default modgameSlice.reducer;
