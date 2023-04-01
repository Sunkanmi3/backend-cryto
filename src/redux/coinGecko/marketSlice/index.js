import { createSlice } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    market: [],
    isLoading: false,
    error: "",

    getSingleCoin: {
      getSingleCoinData: {},
      getSingleCoinLoading: false,
      getSingleCoinError: null,
    },
  },
  reducers: {
    //coin Gecko market info
    marketStart: (state) => {
      state.isLoading = true;
    },
    marketSuccess: (state, action) => {
      (state.isLoading = false), (state.market = action.payload), (state.error = null);
    },
    marketFail: (state, action) => {
      (state.error = action.payload), (state.isLoading = false);
    },
    //get Single coin
    getSingleCoinStart: (state) => {
      state.getSingleCoin.getSingleCoinLoading = true;
    },
    getSingleCoinSuccess: (state, action) => {
      state.getSingleCoin.getSingleCoinLoading = false;
      state.getSingleCoin.getSingleCoinData = action.payload;
      state.getSingleCoin.getSingleCoinError = null;
    },
    getSingleCoinError: (state, action) => {
      state.getSingleCoin.getSingleCoinLoading = false;
      state.getSingleCoin.getSingleCoinError = action.payload;
    },
  },
});

export const {
  marketStart,
  marketSuccess,
  marketFail, 
  //get single coin
  getSingleCoinStart,
  getSingleCoinSuccess,
  getSingleCoinError,
} = marketSlice.actions;
export default marketSlice.reducer;
