import { createSlice } from "@reduxjs/toolkit";

export const marketChartSlice = createSlice({
  name: "marketChart",
  initialState: {
    marketChart: [],
    loading: false,
    isError: "",
  },
  reducers: {
    //coin Gecko market info
    marketChartStart: (state) => {
      state.loading = true;
    },
    marketChartSuccess: (state, action) => {
      (state.loading = false), (state.marketChart = action.payload), (state.isError = null);
    },
    marketChartFail: (state, action) => {
      (state.isError = action.payload), (state.loading = false);
    },
  },
});

export const {
  marketChartStart,
  marketChartSuccess,
  marketChartFail,
 
} = marketChartSlice.actions;
export default marketChartSlice.reducer;
