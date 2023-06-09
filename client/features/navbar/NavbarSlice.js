import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Thunk for fetching search results
export const fetchSearchResults = createAsyncThunk(
  "navbar/fetchSearchResults",
  async (searchInput) => {
    const searchTypes = ["movie", "tv"];
    const searchResults = await Promise.all(
      searchTypes.map(async (searchType) => {
        const response = await fetch(
          `/api/${searchType}/search/${searchInput}`
        );
        const data = await response.json();
        return data;
      })
    );
    return searchResults;
  }
);
const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    searchResults: [],
    movieQuery: "",
    navBarQueryCount: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    movieQuery: (state, action) => {
      state.movieQuery = action.payload
    },
    navBarQueryCount: (state, action) => {
      state.navBarQueryCount = state.navBarQueryCount + 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.navBarQueryCount = state.navBarQueryCount
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { movieQuery, navBarQueryCount} = navbarSlice.actions;

export default navbarSlice.reducer;