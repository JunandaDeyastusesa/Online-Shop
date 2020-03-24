import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';


class order extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      id: "",
      id_alamat: "",
      id_user: "",
      total: "",
      bukti_bayar: "",
      status: "",
      action: "",
      find: "",
      message: "",
    }

    // jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    get_order = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/eproduk/public/order";
      axios.get(url)
      .then(response => {
        this.setState({order: response.data.order});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    componentDidMount = () => {
      this.get_order();
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/order";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({order: response.data.order});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
          <div className="mt-4">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h4 className="#" style={{fontWeight:"600", textAlign:"center", fontSize:"35px"}} >Data order</h4>
                </div>
              </div>
              {/* <div className="col-sm-3">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div> */}

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              {/* <Toast id="loading" autohide="false" title="Informasi"> */}
                {/* <span className="fa fa-spin fa-spinner"></span> Sedang Memuat */}
              {/* </Toast> */}
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID User</th>
                    <th>Penerima</th>
                    <th>Total</th>
                    <th>Bukti Bayar</th>
                    <th>Detail Order</th>
                    <th>Status</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.order.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.id_order}</td>
                        <td>{item.id_user}</td>
                        <td>{item.id_pengiriman}</td>
                        <td>{item.total}</td>
                        <td>{item.bukti_bayar}</td>
                        <td>
                          {item.detail.map((it) => {
                            return(
                              <ul key={it.id_order}>
                                 <li>{it.nama_produk} ({it.quantity})</li>
                              </ul>
                              )
                            })}
                        </td>
                        <td>{item.status}</td>
                        <td><td>
                          <Link className="m-1 btn btn-sm btn-outline-info" onClick="http://localhost/eproduk/public/order/decline/{id_order}">
                            <span>Terima</span>
                          </Link>
                          <Link className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id_user)}>
                            <span className="#">Tolak</span>Link
                          </Link>
                        </td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}

              {/* form modal siswa*/}
              {/* <Modal id="modal_order" title="Form order" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                Nama
                  <input type="text" className="form-control" name="nama_order"
                    value={this.state.nama_order} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email"
                    value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
                  Foto
                  <input type="file" className="form-control" name="img_order"
                   onChange={this.bindImage} />

                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select className="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                      <option value="Admin">Admin</option>
                      <option value="order">order</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal> */}
            </div>
          </div>


        </div>
      );
    }



}
export default order;
