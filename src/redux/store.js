import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authUsersSlice";
import depositReducer from "./depositSlice";
import withdrawalReducer from "./withdrawalSlice"
import marketReducer from "./coinGecko/marketSlice";
import marketChartReducer from "./coinGecko/marketChartSlice";


export default configureStore({
  reducer: {
    authUser: userReducer,
    deposit: depositReducer,
    withdrawal: withdrawalReducer,
    marketCoin: marketReducer,
    marketCoinChart: marketChartReducer,
  },
});