import React, { Component } from "react";
import DanhSachSanPham from "./danh-sach-san-pham";
import Modal from "./modal";
import data from "./data.json";

import { connect } from "react-redux";
class Shopingcart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listProduct: data,
      detailPro: data[0],
      listCart: [],
    };
  }

  renderSoLuong = () => {
    let count = 0;
    const { listCart } = this.props;

    listCart.forEach((item) => {
      count += item.soLuong;
    });

    return count;

// listCart.reduce((item.)=>{},0)


  };




  handelGetProduct = (product) => {
    this.setState({
      detailPro: product,
    });
  };

  _findIndex = (maSP) => {
    return this.state.listCart.findIndex((items) => {
      return items.maSP === maSP;
    });
  };

  deleteProduct = (item) => {
    let listCart = [...this.state.listCart];
    const index = this._findIndex(item.maSP);

    if (index !== -1) {
      listCart.splice(index, 1);

      this.setState({
        listCart,
      });
    }
  };

  editSoLuong = (item, flag) => {
    let listCart = [...this.state.listCart];
    const index = this._findIndex(item.maSP);
    if (index !== -1) {
      if (flag == false) {
        if (listCart[index].soLuong > 1) {
          listCart[index].soLuong--;
        }
      } else {
        listCart[index].soLuong++;
      }

      this.setState({
        listCart: listCart,
      });
    }
  };

  handelTakeProduct = (product) => {
    // {this.renderSoLuong()};
    let listCart = [...this.state.listCart];
    const index = this._findIndex(product.maSP);

    if (index !== -1) {
      listCart[index].soLuong++;
    } else {
      const item = {
        maSP: product.maSP,
        tenSP: product.tenSP,
        hinhAnh: product.hinhAnh,
        soLuong: 1,
        donGia: product.giaBan,
      };

      listCart.push(item);
    }

    // console.log(product);

    // listCart.push(item);

    this.setState({
      listCart: listCart,
    });
  };

  render() {
    // {this.renderSoLuong()};
    const {detailPro} = this.props;
    const { listProduct, listCart, count } = this.state;

    return (
      <div>
        <h3 className="title">Bài tập giỏ hàng</h3>
        <div className="container">
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modelId"
          >
            Giỏ hàng ({this.renderSoLuong()})
          </button>
        </div>
        <DanhSachSanPham
          // listProduct={listProduct}
          // getDetailProduct={this.handelGetProduct}
          // takeCartProduct={this.handelTakeProduct}
        />
        <Modal
          listCart={listCart}
          // deleteItem={this.deleteProduct}
          // editSoLuong={this.editSoLuong}
        />
        <div className="row">
          <div className="col-sm-5">
            <img className="img-fluid" src={detailPro.hinhAnh} alt="" />
          </div>
          <div className="col-sm-7">
            <h3>Thông số kỹ thuật</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Màn hình</td>
                  <td>{detailPro.manHinh}</td>
                </tr>
                <tr>
                  <td>Hệ điều hành</td>
                  <td>{detailPro.heDieuHanh}</td>
                </tr>
                <tr>
                  <td>Camera trước</td>
                  <td>{detailPro.cameraTruoc}</td>
                </tr>
                <tr>
                  <td>Camera sau</td>
                  <td> {detailPro.cameraSau}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{detailPro.ram}</td>
                </tr>
                <tr>
                  <td>ROM</td>
                  <td>{detailPro.rom}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailPro: state.productReducer.detailProduct,
    listCart: state.productReducer.listCart,
  };
};

export default connect(mapStateToProps, null)(Shopingcart);