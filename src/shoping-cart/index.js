import React, { Component } from "react";
import DanhSachSanPham from "./danh-sach-san-pham";
import Modal from "./modal";
import data from "./data.json";

export default class Shopingcart extends Component {
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
    const { listCart } = this.state;

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
    const { listProduct, detailPro, listCart, count } = this.state;

    return (
      <div>
        <h3 className="title">B??i t???p gi??? h??ng</h3>
        <div className="container">
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modelId"
          >
            Gi??? h??ng ({this.renderSoLuong()})
          </button>
        </div>
        <DanhSachSanPham
          // listProduct={listProduct}
          getDetailProduct={this.handelGetProduct}
          takeCartProduct={this.handelTakeProduct}
        />
        <Modal
          listCart={listCart}
          deleteItem={this.deleteProduct}
          editSoLuong={this.editSoLuong}
        />
        <div className="row">
          <div className="col-sm-5">
            <img className="img-fluid" src={detailPro.hinhAnh} alt="" />
          </div>
          <div className="col-sm-7">
            <h3>Th??ng s??? k??? thu???t</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>M??n h??nh</td>
                  <td>{detailPro.manHinh}</td>
                </tr>
                <tr>
                  <td>H??? ??i???u h??nh</td>
                  <td>{detailPro.heDieuHanh}</td>
                </tr>
                <tr>
                  <td>Camera tr?????c</td>
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
