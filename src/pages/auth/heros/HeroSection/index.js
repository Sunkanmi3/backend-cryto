import React from "react";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  // Icon,
  // Button,
  Row,
  Col,
  PreviewCard,
  PreviewAltCard,
  BlockBetween,
  UserAvatar,
} from "../../../../components/Component";
import Icon from "../../../../components/icon/Icon";

import "./App.css";
import { Button } from "../ButtonSection";
import { Link } from "react-router-dom";
import videop from "../../../../assets/videos/video5.mp4";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Carousel } from "react-responsive-carousel";

import "./HeroSection.css";
import { useDispatch, useSelector } from "react-redux";
import { getMarketCoinInfo } from "../../../../redux/coinGecko/marketSlice/marketApi";
import TransactionTable from "../../../../components/partials/default/transaction/Transaction";

function HeroSection() {
  const dispatch = useDispatch();
  const { market, isLoading, error } = useSelector((state) => state.marketCoin);

  console.log({ market, isLoading, error }, "hero");

  const items = market?.map((coin) => {
    const profit = coin.market_cap_change_percentage_24h < 0;
    return (
      <>
        <img
          src={coin.image}
          alt={coin.name}
          role="presentation"
          height="80"
          // width="20"
          style={{ marginBottom: 10 }}
        />

        <div style={{ color: "#fff" }}>
          <span>{coin.symbol} &nbsp;</span>
          <span className={`tb-sub ${coin.price_change_percentage_24h < 0 ? "text-danger" : "text-primary"}`}>
            {coin.price_change_percentage_24h < 0 ? <Icon name="trend-down" /> : <Icon name="trend-up" />}{" "}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div style={{ color: "#fff" }}>
          <p style={{ color: "#fff", alignSelf: "center" }}>${coin.current_price.toFixed(2)}</p>
        </div>
      </>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  React.useEffect(() => {
    //    getMarketChart(dispatch);
    getMarketCoinInfo(dispatch);
  }, []);

  return (
    <>
      <div className="hero-container">
        <h1>ADVENTURE AWAITS</h1>
        <p>The best crypto features you won't find anywhere else </p>
        <p>What are you waiting for?</p>

        <div className="hero-btns">
          <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
            <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
              GET STARTED
            </Button>
          </Link>
        </div>
        <AliceCarousel
          mouseTrackin
          // width="10%"
          infinite={true}
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay={true}
          items={items}
        />

        <Col xxl="8">
          <TransactionTable market={market} isLoading={isLoading} error={error} />
        </Col>
      </div>
    </>
  );
}

export default HeroSection;
