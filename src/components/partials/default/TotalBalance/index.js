import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTitle } from "reactstrap";
import { allDeposit } from "../../../../redux/depositSlice/depositApi";
import { allWithdrawal } from "../../../../redux/withdrawalSlice/withdrawalApi";
import { Icon, TooltipComponent } from "../../../Component";
import { BarChart } from "../../charts/default/Charts";
import { auth } from "../../../../config2/firebase";

const TotalBalance = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const {
    getAllWithdrawal: { getWithdrawalData },
  } = useSelector((state) => state.withdrawal);

  const {
    getAllDeposit: { getDepositData },
  } = useSelector((state) => state.deposit);

  //deposit
  const depositData = getDepositData.filter((d) => d.userId === user?.uid);
  const depositTotal = depositData.reduce((acc, row) => acc + parseFloat(row.amount), 0);

  // withdrawal
  const withdrawalData = getWithdrawalData.filter((d) => d.userId === user?.uid);
  const withdrawaltotal = withdrawalData.reduce((acc, row) => acc + parseFloat(row.amount), 0);


  const totalBalance = parseFloat(depositTotal) - parseFloat(withdrawaltotal);

  // console.log(totalBalance, "total")

  useEffect(() => {
    allDeposit(dispatch);
    allWithdrawal(dispatch);
  }, []);

  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Balance in Account</h6>
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
          <span className="amount">{totalBalance.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
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
export default TotalBalance;
