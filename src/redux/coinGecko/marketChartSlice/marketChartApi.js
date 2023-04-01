import coinGeckoAxiosInstance from "../../../utils/coinGeckoAxiosInstance";
import {
  marketChartStart,
  marketChartSuccess,
  marketChartFail, 
} from "./index";

export const getMarketChart = async (coinId, dispatch) => {
    console.log(coinId, "coinMarketcoinId");
  dispatch(marketChartStart());
  try {
    const res = await coinGeckoAxiosInstance.get(`${coinId}/market_chart?vs_currency=usd&days=7`);
    console.log(res.data, "coinMarketChart");
    dispatch(marketChartSuccess(res.data));
  } catch (error) {
    dispatch(marketChartFail(error.response));
    console.log(error.response);
  }
};


