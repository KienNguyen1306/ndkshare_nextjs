import { mergeLists } from "@/helper";
import BASE_URL_API from "@/lib/constans/baseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  totalCount: 0,
  totalPages: 1,
  perPage: 0,
  loading: true,
  error: false,
  lessons: {
    dataCoures: {},
    titleCoures:[],
    dataLission:[],
    dataconver:[],
    loading: true,
    error: false,
  },
  searchcourses: {
    lists: [],
    totalCount: 0,
    totalPages: 1,
  },
};
export const getCoures = createAsyncThunk(
  "courses/fetchAll",
  async (params, thunkAPI) => {
    let page = params.page || 1;
    const response = await axios.get(`${BASE_URL_API}/courses?page=${page}`);
    return response.data;
  }
);

export const getDetailCourses = createAsyncThunk(
  "coursesDetail/fetchAll",
  async (params, thunkAPI) => {
    let { id } = params;
    const response = await axios.get(
      `${BASE_URL_API}/courses/${id}`
    );
    return response.data;
  }
);

export const getSearchCourese = createAsyncThunk(
  "searchgame/fetchAll",
  async (params, thunkAPI) => {
    let { k, page } = params;
    const response = await axios.get(
      `${BASE_URL_API}/courses/searchcourses?k=${k}&page=${page}`
    );
    return response.data;
  }
);

export const postCoures = createAsyncThunk(
  "postcoures/fetchAll",
  async (params, thunkAPI) => {
    const response = await axios.post(`${BASE_URL_API}/courses`, params);
    if (response.status === 201) {
      return response.data.data;
    }
  }
);

export const deleteCoures = createAsyncThunk(
  "deletecoures/fetchAll",
  async (id, thunkAPI) => {
    const response = await axios.delete(`${BASE_URL_API}/courses/${id}`);
    if (response.status === 200) {
      return id;
    }
  }
);

export const postLession = createAsyncThunk(
  "postlession/fetchAll",
  async (params, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL_API}/courses/lessions`,
      params
    );
    if (response.status === 201) {
      return response.data.data;
    }
  }
);

export const deleteLession = createAsyncThunk(
  "deletelession/fetchAll",
  async (id, thunkAPI) => {
    const response = await axios.delete(
      `${BASE_URL_API}/courses/lessions/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const shareCouresSlice = createSlice({
  name: "Coures",
  initialState,
  extraReducers: (builder) => {
    builder
      // get counress
      .addCase(getCoures.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
        state.loading = false;
        state.error = false;
      })
      .addCase(getCoures.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // get coures detail
      .addCase(getDetailCourses.fulfilled, (state, action) => {
        state.lessons.dataCoures = action.payload.dataCoures;
        state.lessons.titleCoures = action.payload.titleCoures;
        state.lessons.dataLission = action.payload.dataLission;
        let dataconver = mergeLists(action.payload.titleCoures,action.payload.dataLission)
        state.lessons.dataconver = dataconver;
        state.lessons.loading = false;
        state.lessons.error = false;

      })

      .addCase(getDetailCourses.rejected, (state, action) => {
        state.lessons.error = action.error.message;
        state.lessons.loading = false;
      })
      .addCase(getSearchCourese.fulfilled, (state, action) => {
        state.searchcourses.lists = action.payload.data;
        state.searchcourses.totalCount = action.payload.totalCount;
        state.searchcourses.totalPages = action.payload.totalPages;
      })
      .addCase(postCoures.fulfilled, (state, action) => {
        const newCoures = action.payload;
        const currentLength = state.lists.length;
        state.lists.unshift(newCoures);
        if (currentLength >= state.perPage) {
          state.lists.pop();
        }
        state.totalCount += 1;
        state.totalPages = Math.ceil(state.totalCount / state.lists.length);
      })
      .addCase(deleteCoures.fulfilled, (state, action) => {
        state.lists = state.lists.filter((item) => item.id !== action.payload);
        state.totalCount -= 1;
        state.totalPages = Math.ceil(state.totalCount / state.lists.length);
      })
      .addCase(postLession.fulfilled, (state, action) => {
        const newLession = action.payload;
        const currentLength = state.lessons.list.length;
        state.lessons.list.unshift(newLession);
        if (currentLength >= state.lessons.perPage) {
          state.lists.pop();
        }
        state.lessons.totalCount += 1;
        state.lessons.totalPages = Math.ceil(
          state.lessons.totalCount / state.lessons.list.length
        );
      })
      .addCase(deleteLession.fulfilled, (state, action) => {
        state.lessons.list = state.lessons.list.filter(
          (item) => item.id !== action.payload
        );
        state.lessons.totalCount -= 1;
        state.lessons.totalPages = Math.ceil(
          state.lessons.totalCount / state.lessons.perPage
        );
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  shareCouresSlice.actions;

export default shareCouresSlice.reducer;
