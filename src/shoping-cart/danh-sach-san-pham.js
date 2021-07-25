import React, { Component } from "react";
import SanPham from "./san-pham";

export default class DanhSachSanPham extends Component {
  
  renderListProduct  =() => {

      // console.log(this.props.listProduct);
    return this.props.listProduct.map((product)=>{

        return <SanPham key={product.maSP} product={product} getDetailProduct={this.props.getDetailProduct} takeCardProduct={this.props.takeCartProduct}/>;

       

      


      })



  }
  
  
  
  render() {

    return (
      <div className="container">
        <div className="row">
          {/* <SanPham />
          <SanPham />
          <SanPham /> */}
          {this.renderListProduct()}
        </div>
      </div>
    );
  }
}

