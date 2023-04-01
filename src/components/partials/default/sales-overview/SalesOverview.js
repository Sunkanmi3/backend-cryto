import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../Component";
import { DoubleBar, LineChart } from "../../charts/default/Charts";

const SalesOverview = ({ marketChart, loading, isError }) => {
  const dispatch = useDispatch;

  const {
    getSingleCoin: { getSingleCoinData, getSingleCoinLoading, getSingleCoinError },
  } = useSelector((state) => state.marketCoin);

  // console.log({ marketChart, loading, isError }, "33333");
  // console.log({ getSingleCoinData, getSingleCoinLoading, getSingleCoinError }, "444444");

  return (
    <React.Fragment>
      <div className="card-title-group align-start gx-3 mb-3">
        <div className="card-title">
          {getSingleCoinLoading && <p>Loading...</p>}
          {getSingleCoinError && <p>Something went wrong</p>}
          {!getSingleCoinLoading && !getSingleCoinError && (
            <>
              <h6 className="title">{getSingleCoinData.id} Chart</h6>
              <p>30 days of Bitcoin market cap. </p>
            </>
          )}
        </div>
      </div>
      {loading ? (
        <p>Loading ...</p>
      ) : isError ? (
        <p>{`Ooops! An Error Occur, ${isError?.data?.error}`}</p>
      ) : (
        <div className="nk-sales-ck large pt-4">
          <LineChart marketChart={marketChart} />
        </div>
      )}
    </React.Fragment>
  );
};
export default SalesOverview;
