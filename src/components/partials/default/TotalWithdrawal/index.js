import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CardTitle } from "reactstrap";
import { auth } from "../../../../config2/firebase";
import { allDeposit } from "../../../../redux/depositSlice/depositApi";
import { allWithdrawal } from "../../../../redux/withdrawalSlice/withdrawalApi";
import { Icon, TooltipComponent } from "../../../Component";
import { BarChart } from "../../charts/default/Charts";

const TotalWithdrawal = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const {
    getAllWithdrawal: { getWithdrawalData },
  } = useSelector((state) => state.withdrawal);


  
  const withdrawalData = getWithdrawalData.filter((d) => d.userId === user?.uid);
  const withdrawaltotal = withdrawalData.reduce((acc, row) => acc + parseFloat(row.amount), 0);

  // console.log(withdrawaltotal, getWithdrawalData, "Withdrawaltotal");

  useEffect(() => {
    allDeposit(dispatch);
    allWithdrawal(dispatch);
  }, []);




  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Total Withdrawal</h6>
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
          <span className="amount">{withdrawaltotal.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
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
export default TotalWithdrawal;
