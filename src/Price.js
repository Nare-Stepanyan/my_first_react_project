import React, { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
    };
  }
  changeCurrency = () => {
    const armenianDram = "֏";
    const dollar = "$";
    let { price } = this.state;
    let currency = price[price.length - 1];
    let rate = 487;

    if (currency === dollar) {
      let priceInArmenianDram = parseFloat(price) * rate + "֏";
      this.setState({
        price: priceInArmenianDram,
      });
    } else if (currency === armenianDram) {
      let priceInDollar = parseFloat(price) / rate + "$";
      this.setState({
        price: priceInDollar,
      });
    }
  };
  render() {
    return (
      <>
        <span className="price">{this.state.price}</span>
        <button onClick={this.changeCurrency}>Change Currency</button>
      </>
    );
  }
}
export default Price;
