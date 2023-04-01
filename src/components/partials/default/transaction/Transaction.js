import React, { useEffect, useState } from "react";
import Icon from "../../../icon/Icon";
import UserAvatar from "../../../user/UserAvatar";
import moment from "moment";
import { transactionData } from "./TransactionData";
import {
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  FormGroup,
  Modal,
  ModalBody,
  Form,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  // Icon,
  Col,
  PreviewAltCard,
  PaginationComponent,
  Row,
  RSelect,
} from "../../../../components/Component";
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from "../../../table/DataTable";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMarketChart } from "../../../../redux/coinGecko/marketChartSlice/marketChartApi";
import SalesOverview from "../sales-overview/SalesOverview";
import { getSingleMarketCoin } from "../../../../redux/coinGecko/marketSlice/marketApi";

const TransactionTable = ({ market, isLoading, error }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(transactionData);
  const [viewModal, setViewModal] = useState(false);
  const [trans, setTrans] = useState("");


   const { marketChart, loading, isError } = useSelector((state) => state.marketCoinChart);



   const openMarketChart = (coinId)=>{
     getMarketChart( coinId, dispatch);
     getSingleMarketCoin(coinId, dispatch)

   }



  // useEffect(()=>{
  //    getMarketChart(dispatch);
  // },[])
  useEffect(() => {
    let filteredData;
    if (trans === "Due") {
      filteredData = transactionData.filter((item) => item.status === "Due");
    } else if (trans === "Paid") {
      filteredData = transactionData.filter((item) => item.status === "Paid");
    } else {
      filteredData = transactionData;
    }
    setData(filteredData);
  }, [trans]);

  const DropdownTrans = ({item}) => {

    console.log(item.id, "item.id");
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu right>
          <ul className="link-list-plain">
            <li
              onClick={() => {
                openMarketChart(item.id);
                setViewModal(true);
              }}
            >
              <DropdownItem
                tag="a"
                href="#view"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                View
              </DropdownItem>
            </li>
            {/* <li>
              <DropdownItem
                tag="a"
                href="#invoice"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Invoice
              </DropdownItem>
            </li> */}
            
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  return (
    <React.Fragment>
      <div className="card-inner">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">
              <span className="mr-2">Transaction</span>
            </h6>
          </CardTitle>
        </div>
      </div>
      <DataTableBody className="border-top" bodyclass="nk-tb-orders">
        <DataTableHead>
          <DataTableRow size="sm">
            <span>Name</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Last Update</span>
          </DataTableRow>

          <DataTableRow>
            <span>Amount</span>
          </DataTableRow>
          <DataTableRow size="lg">
            <span>24th % change</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Market Cap</span>
          </DataTableRow>
          <DataTableRow>
            <span>&nbsp;</span>
          </DataTableRow>
        </DataTableHead>
        {market?.map((item, idx) => {
          return (
            <DataTableItem key={item.id}>
              <DataTableRow size="sm">
                <div className="user-card">
                  <UserAvatar size="sm" theme={item.theme} text={item.initial} image={item.image}></UserAvatar>
                  <div className="user-name">
                    <span className="tb-lead">{item.name}</span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-sub">{moment(item.last_updated).format("MMMM Do YYYY")}</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">{currencyFormat(item.current_price)}</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className={`tb-sub ${item.price_change_percentage_24h < 0 ? "text-danger" : "text-primary"}`}>
                  {item.price_change_percentage_24h < 0 ? <Icon name="trend-down" /> : <Icon name="trend-up" />}
                  {item.price_change_percentage_24h}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="badge badge-dot badge-dot-xs">{currencyFormat(item.market_cap)}</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-action">
                <DropdownTrans item={item} />
              </DataTableRow>
            </DataTableItem>
          );
        })}
      </DataTableBody>
      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              setViewModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="nk-modal-head">
            <h4 className="nk-modal-title title">
              Transaction 
            </h4>
          </div>
          <Col xxl="6">
            <PreviewAltCard className="h-100">
              <SalesOverview marketChart={marketChart} loading={loading} isError={isError} />
            </PreviewAltCard>
          </Col>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default TransactionTable;
