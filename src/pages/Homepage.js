import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SaleRevenue from "../components/partials/default/sale-revenue/SaleRevenue";
import ActiveSubscription from "../components/partials/default/active-subscription/ActiveSubscription";
import AvgSubscription from "../components/partials/default/avg-subscription/AvgSubscription";
import SalesOverview from "../components/partials/default/sales-overview/SalesOverview";
import TransactionTable from "../components/partials/default/transaction/Transaction";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import NewsUsers from "../components/partials/default/new-users/User";
import Support from "../components/partials/default/support-request/Support";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewCard,
  PreviewAltCard,
  BlockBetween,
} from "../components/Component";
import TotalDeposit from "../components/partials/default/TotalDeposit";
import TotalWithdrawal from "../components/partials/default/TotalWithdrawal";
import TotalBalance from "../components/partials/default/TotalBalance";
import { useDispatch, useSelector } from "react-redux";
import { getMarketCoinInfo } from "../redux/coinGecko/marketSlice/marketApi";
import { getMarketChart } from "../redux/coinGecko/marketChartSlice/marketChartApi";
import { auth } from "../config2/firebase";
import { getAllUserInfo } from "../redux/authUsersSlice/authUsersApi";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  const dispatch = useDispatch();
   const authUser = auth.currentUser;

    const {
      getUsersInfo: { getUsersInfoData },
    } = useSelector((state) => state.authUser);


  const {market, isLoading, error} = useSelector((state) => state.marketCoin);
  const { marketChart, loading, isError } = useSelector((state) => state.marketCoinChart);


  // console.log({ marketChart, loading, isError }, "depositData");

  const findUser = getUsersInfoData?.find((user) => user?.id === authUser?.uid);


  React.useEffect(()=>{
    getMarketChart(dispatch);
    getMarketCoinInfo(dispatch);
    getAllUserInfo(dispatch)
  },[])

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
              {!findUser && !authUser ? (
                <h3>Wait...</h3>
              ) : (
                <BlockDes className="text-soft">
                  <p>{findUser?.name} welcome to your Dashboard</p>
                </BlockDes>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        {/* <DropdownMenu>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu> */}
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="6">
              <Row className="g-gs">
                <Col lg="4" xxl="12">
                  <PreviewAltCard>
                    <TotalDeposit />
                  </PreviewAltCard>
                </Col>
                <Col lg="4" xxl="12">
                  <PreviewAltCard>
                    <TotalWithdrawal />
                  </PreviewAltCard>
                </Col>
                <Col lg="4" xxl="12">
                  <PreviewAltCard>
                    <TotalBalance />
                  </PreviewAltCard>
                </Col>
              </Row>
            </Col>

            <Col xxl="8">
              <Card className="card-bordered card-full">
                <TransactionTable market={market} isLoading={isLoading} error={error} />
              </Card>
            </Col>
            {/* <Col xxl="8">
              <Card className="card-bordered card-full">
                <SalesOverview marketChart={marketChart} loading={loading} isError={isError} />
              </Card>
            </Col> */}

            {/* <Col xxl="6">
              <PreviewAltCard className="h-100">
                <SalesOverview marketChart={marketChart} loading={loading} isError={isError} />
              </PreviewAltCard>
            </Col> */}
            {/* <Col xxl="4" md="6">
              <Card className="card-bordered card-full">
                <RecentActivity />
              </Card>
            </Col> */}
            {/* <Col xxl="4" md="6">
              <Card className="card-bordered card-full">
                <NewsUsers />
              </Card>
            </Col> */}
            {/* <Col lg="6" xxl="4">
              <Card className="card-bordered h-100">
                <Support />
              </Card>
            </Col> */}
            {/* <Col lg="6" xxl="4">
              <Card className="card-bordered h-100">
                <Notifications />
              </Card>
            </Col> */}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
