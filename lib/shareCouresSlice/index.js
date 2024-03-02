import BASE_URL_API from '@/constans/baseUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
  lists: [],
  totalCount:0,
  totalPages:1,
  lessons:{
    list:[],
    totalCount:0,
    totalPages:0,
    nameLessons:[],
    dataCoures:{}
    
  },
  searchcourses:{
    lists:[],
    totalCount:0,
    totalPages:1,
  }
}
export const getCoures = createAsyncThunk(
  "courses/fetchAll",
  async (params, thunkAPI) => {
    let page = params.page || 1
    const response = await axios.get(`${BASE_URL_API}/courses?page=${page}`);
    return response.data;
  }
);


export const getDetailCourses = createAsyncThunk(
  "coursesDetail/fetchAll",
  async (params, thunkAPI) => {
    let {id,page}=params
    const response = await axios.get(`${BASE_URL_API}/courses/${id}?page=${page}`);
    console.log('re coures',response)
    return response.data;
  }
);

export const getSearchCourese = createAsyncThunk(
  "searchgame/fetchAll",
  async (params, thunkAPI) => {
    let {k,page} =params
    const response = await axios.get(`${BASE_URL_API}/courses/searchcourses?k=${k}&page=${page}`);
    return response.data;;
  }
);

export const postCoures = createAsyncThunk(
  "postcoures/fetchAll",
  async (params, thunkAPI) => {
    const response = await axios.post(`${BASE_URL_API}/courses`,params);
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




export const shareCouresSlice = createSlice({
  name: 'Coures',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCoures.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getDetailCourses.fulfilled, (state, action) => {
        state.lessons.list = action.payload.data;
        state.lessons.totalCount = action.payload.totalCount;
        state.lessons.totalPages = action.payload.totalPages;
        state.lessons.nameLessons = action.payload.resultsNameLessons;
        state.lessons.dataCoures = action.payload.dataCoures[0];

      })
      .addCase(getSearchCourese.fulfilled, (state, action) => {
        state.searchcourses.lists = action.payload.data;
        state.searchcourses.totalCount = action.payload.totalCount;
        state.searchcourses.totalPages = action.payload.totalPages;
      })
      .addCase(postCoures.fulfilled, (state, action) => {
        state.totalPages = Math.ceil((state.totalCount + 1) / state.lists.length)
        state.lists.unshift(action.payload)
        state.lists.pop()
        state.totalCount = state.totalCount + 1;
      })
      .addCase(deleteCoures.fulfilled, (state, action) => {
        state.totalPages = Math.ceil((state.totalCount - 1) / state.lists.length)
        state.lists = state.lists.filter((item) => item.id !== action.payload);
        state.totalCount = state.totalCount - 1;
      })
  },
})

export const { increment, decrement, incrementByAmount } = shareCouresSlice.actions

export default shareCouresSlice.reducer