import React, { Component } from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";

class Product extends Component {
  render() {
    return (
      <div className="product">
        <Name name={this.props.name} />
        <Description description={this.props.description} />
        <Price price={this.props.price} />
      </div>
    );
  }
}

export default Product;
