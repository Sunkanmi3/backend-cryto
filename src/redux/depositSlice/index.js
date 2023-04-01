import { createSlice } from "@reduxjs/toolkit";

export const depositSlice = createSlice({
  name: "deposit",
  initialState: {
    depositInfo: {
      depositInfoData: {},
      depositInfoLoading: false,
      depositInfoError: null,
    },
    getAllDeposit: {
      getDepositData: [],
      getAllDepositLoading: false,
      getAllDepositError: null,
    },
    paymentMedthod: {
      paymentMedthodData:[],
    },
   
  },
  reducers: {
    //login
    depositStart: (state) => {
      state.depositInfo.depositInfoLoading = true;
    },
    depositSuccess: (state, action) => {
      state.depositInfo.depositInfoLoading = false;
      state.depositInfo.depositInfoData = action.payload;
      state.depositInfo.depositInfoError = null;
    },
    depositFail: (state, action) => {
      state.depositInfo.depositInfoError = action.payload;
      state.depositInfo.depositInfoLoading = false;
    },
    getDepositStart: (state) => {
      state.getAllDeposit.getAllDepositLoading = true;
    },
    getDepositSuccess: (state, action) => {
      state.getAllDeposit.getAllDepositLoading = false;
      state.getAllDeposit.getDepositData = action.payload;
      state.getAllDeposit.getAllDepositError = null;
    },
    getDepositFail: (state, action) => {
      state.getAllDeposit.getAllDepositLoading = false;
      state.getAllDeposit.getAllDepositError = action.payload;
    },
    paymentMedthodSuccess : (state, action) =>{
      state.paymentMedthod.paymentMedthodData = action.payload
    },
  },
});

export const {
  depositStart,
  depositSuccess,
  depositFail,
  //getDeposit
  getDepositStart,
  getDepositSuccess,
  getDepositFail,
  //payment method
  paymentMedthodSuccess,
} = depositSlice.actions;
export default depositSlice.reducer;
