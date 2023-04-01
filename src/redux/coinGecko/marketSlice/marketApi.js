import coinGeckoAxiosInstance from "../../../utils/coinGeckoAxiosInstance";
import {
  marketStart,
  marketSuccess,
  marketFail,
  //get single coin
  getSingleCoinStart,
  getSingleCoinSuccess,
  getSingleCoinError,
} from "./index";

export const getMarketCoinInfo = async (dispatch) => {
  //   console.log(user, "coinMarket");
  dispatch(marketStart());
  try {
    const res = await coinGeckoAxiosInstance.get(
      "markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    console.log(res.data, "coinMarket");
    dispatch(marketSuccess(res.data));
    console.log(res.data, "coinMarketapi");
  } catch (error) {
    dispatch(marketFail(error.message));
    console.log(error);
  }
};

export const getSingleMarketCoin = async (coinId, dispatch) => {
  console.log(coinId, "coinMarketCoinId");
  dispatch(getSingleCoinStart());
  try {
    const res = await coinGeckoAxiosInstance.get(`${coinId}`);
    console.log(res.data, "coinMarketCoinApi");
    dispatch(getSingleCoinSuccess(res.data));
  } catch (error) {
    dispatch(getSingleCoinError(error.response));
    console.log(error.response);
  }
};
