import { createSlice } from "@reduxjs/toolkit";

export const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState: {
    createWithdrawal: {
      createWithdrawalData: {},
      createWithdrawalLoading: "",
      createWithdrawalError: 0,
    },
    getAllWithdrawal: {
      getWithdrawalData: [],
      getWithdrawalLoading: false,
      getWithdrawalError: null,
    },
  },
  reducers: {
    //login
    withdrawalStart: (state) => {
      state.createWithdrawal.createWithdrawalLoading = true;
    },
    withdrawalSuccess: (state, action) => {
      state.createWithdrawal.createWithdrawalLoading = false;
      state.createWithdrawal.createWithdrawalData = action.payload;
      state.createWithdrawal.createWithdrawalError = null;
    },
    withdrawalFail: (state, action) => {
      state.createWithdrawal.createWithdrawalError = action.payload;
      state.createWithdrawal.createWithdrawalLoading = false;
    },
    getWithdrawalStart: (state) => {
      state.getAllWithdrawal. getWithdrawalLoading = true;
    },
    getWithdrawalSuccess: (state, action) => {
      state.getAllWithdrawal.getWithdrawalLoading = false;
      state.getAllWithdrawal.getWithdrawalData = action.payload;
      state.getAllWithdrawal.getWithdrawalError = null
    },
    getWithdrawalFail: (state) => {
      state.getAllWithdrawal. getWithdrawalLoading = false;
      state.getAllWithdrawal.getWithdrawalError = action.payload;
    },
  },
});

export const {
  //create withdrawal
  withdrawalStart,
  withdrawalSuccess,
  withdrawalFail,
  //getWithdrawal
  getWithdrawalStart,
  getWithdrawalSuccess,
  getWithdrawalFail,
} = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
