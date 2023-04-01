import React, { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTitle } from "reactstrap";
import { auth } from "../../../../config2/firebase";
import { allDeposit } from "../../../../redux/depositSlice/depositApi";
import { allWithdrawal } from "../../../../redux/withdrawalSlice/withdrawalApi";
import { Icon, TooltipComponent } from "../../../Component";
import { BarChart, LineChart } from "../../charts/default/Charts";

const TotalDeposit = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();

const {
  getAllDeposit: { getDepositData },
} = useSelector((state) => state.deposit);
  

  const depositData = getDepositData.filter((d) => d.userId === user?.uid);

    const deposittotal = depositData.reduce((acc, row) => acc + parseFloat(row.amount), 0);


      useEffect(() => {
        allDeposit(dispatch);
        allWithdrawal(dispatch);
      }, []);

  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Total Deposit</h6>
        </CardTitle>
        {/* <div className="card-tools">
          <TooltipComponent
            icon="help-fill"
            iconClass="card-hint"
            direction="left"
            id="Tooltip-3"
            text="Daily Avg. subscription"
          />
        </div> */}
      </div>
      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
        <div className="nk-sale-data">
          <span className="amount">{deposittotal?.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
          <span className="sub-title">
            <span className="change up text-success">
              <Icon name="arrow-long-up" />
              2.45%
            </span>
            since last week
          </span>
        </div>
        <div className="nk-sales-ck">
          <BarChart />
        </div>
      </div>
    </React.Fragment>
  );
};
export default TotalDeposit;
