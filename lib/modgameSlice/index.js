import BASE_URL_API from "@/lib/constans/baseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  totalCount: 0,
  totalPages: 1,
  gameDetail: {
    loading: true,
    error: false,
  },
  perPage: 0,
  searchgame: {
    lists: [],
    totalCount: 0,
    totalPages: 1,
  },
  comments: {
    list: [],
    totalPagesCmt: 0,
    totalCountCmt: 0,
    perPage: 1,
  },
  loading: true,
  error: false,
};
export const getGameMod = createAsyncThunk(
  "game/fetchAll",
  async (params, thunkAPI) => {
    try {
      let page = params.page || 1;
      const response = await axios.get(`${BASE_URL_API}/modgames?page=${page}`);
      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây, ví dụ:
      console.error("Error fetching mod games:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/fetchAll",
  async (params, thunkAPI) => {
    try {
      let page = params.page || 1;
      let id = params.id;
      const response = await axios.get(
        `${BASE_URL_API}/modgames/${id}/comment?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);

export const getDetailGame = createAsyncThunk(
  "gameDetail/fetchAll",
  async (id, thunkAPI) => {
    const response = await axios.get(`${BASE_URL_API}/modgames/${id}`);
    return response.data;
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

export const postGameComment = createAsyncThunk(
  "postgamecomment/fetchAll",
  async (params, thunkAPI) => {
    let data = {
      id_game: params.id_game,
      id_user: `${params.id_user}`,
      cmt: params.cmt,
    };
    
    const response = await axios.post(
      `${BASE_URL_API}/modgames/${params.id_game}/comment`,
      data
    );
    if (response.status === 201) {
      return params;
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
        state.gameDetail = action.payload.data;

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
      // get comment
      .addCase(getComment.fulfilled, (state, action) => {
        state.comments.list = action.payload.comments;
        state.comments.totalPagesCmt = action.payload.totalPagesCmt;
        state.comments.totalCountCmt = action.payload.totalCountCmt;
        state.comments.perPage = action.payload.perPage;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.lists = state.lists.filter((item) => item.id !== action.payload);
        state.totalCount -= 1;
        state.totalPages = Math.ceil(state.totalCount / state.lists.length);
      })
      .addCase(postGame.fulfilled, (state, action) => {
        const newGame = action.payload;
        const currentLength = state.lists.length;
        state.lists.unshift(newGame);
        if (currentLength >= state.perPage) {
          state.lists.pop();
        }
        state.totalCount += 1;
        state.totalPages = Math.ceil(state.totalCount / state.lists.length);
      })
      .addCase(postGameComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        state.comments.list.unshift(newComment);
        state.comments.totalCountCmt += 1;
      });
  },
});

export const { increment, decrement, incrementByAmount } = modgameSlice.actions;

export default modgameSlice.reducer;
