import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "authUser",
  initialState: {
    usersInfo: {
      usersInfoData: {},
      isLoading: false,
      error: "",
    },

    getUsersInfo: {
      getUsersInfoData: [],
      getUsersInfoLoading: false,
      getUsersInfoError: null,
    },
  },
  reducers: {
    //login
    authUserStart: (state) => {
      state.usersInfo.isLoading = true;
    },
    authUserSuccess: (state, action) => {
      state.usersInfo.isLoading = false;
      state.usersInfo.usersInfoData = action.payload;
      state.usersInfo.error = null;
    },
    authUserFail: (state, action) => {
      state.usersInfo.error = action.payload;
      state.usersInfo.isLoading = false;
    },
    //register
    registerUserStart: (state) => {
      state.usersInfo.usersInfoIsLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.usersInfo.usersInfoIsLoading = false;
      state.usersInfo.usersInfoData = action.payload;
      state.usersInfo.usersInfoError = null;
    },
    registerUserFail: (state, action) => {
      state.usersInfo.usersInfoError = action.payload;
      state.usersInfo.usersInfoIsLoading = false;
    },
    // // get user
    // get users
    getUsersStart: (state) => {
      state.getUsersInfo.getUsersInfoIsLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.getUsersInfo.getUsersInfoIsLoading = false;
      state.getUsersInfo.getUsersInfoData = action.payload;
      state.getUsersInfo.getUsersInfoError = null;
    },
    getUsersFail: (state, action) => {
      state.getUsersInfo.getUsersInfoError = action.payload;
      state.getUsersInfo.getUsersInfoIsLoading = false;
    },
  },
});

export const {
  authUserStart,
  authUserSuccess,
  authUserFail,
  getUserDetails,
  // register
  registerUserStart,
  registerUserSuccess,
  registerUserFail,
  //get user
  getUsersStart,
  getUsersSuccess,
  getUsersFail,
} = userAuthSlice.actions;
export default userAuthSlice.reducer;
