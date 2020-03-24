import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      produk: [],
      id: "",
      kd_brg: "",
      nama_brg: "",
      jenis_brg: "",
      harga_brg: "",
      jmlh_brg: "",
      img_brg: null,
      action: "",
      find: "",
      message: ""
    }

    
    // if(!localStorage.getItem("Token")){
    
      // window.location = "/login";
    // }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({img_brg: event.target.files[0]})
    }

    Add = () => {
      
      $("#modal_produk").modal("show");
      
      this.setState({
        action: "insert",
        id: "",
        kd_brg: "",
        nama_brg: "",
        jenis_brg: "",
        harga_brg: "",
        jmlh_brg: "",
        img_brg: null
      });
    }

    Edit = (item) => {
      
      $("#modal_produk").modal("show");
     
      this.setState({
        action: "update",
        id: item.id,
        kd_brg: item.kd_brg,
        nama_brg: item.nama_brg,
        jenis_brg: item.jenis_brg,
        harga_brg: item.harga_brg,
        jmlh_brg: item.jmlh_brg,
        img_brg: item.img_brg

      });
    }

    get_produk = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/eproduk/public/produk";
      axios.get(url)
      .then(response => {
        this.setState({produk: response.data.produk});
        // $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/produk/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_produk();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_produk();
      
    }

    Save = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_produk").modal("hide");
      let url = "http://localhost/eproduk/public/produk/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("kd_brg", this.state.kd_brg);
      form.append("nama_brg", this.state.nama_brg);
      form.append("jenis_brg", this.state.jenis_brg);
      form.append("harga_brg", this.state.harga_brg);
      form.append("jmlh_brg", this.state.jmlh_brg);
      // if (form.has("img_brg")){
      form.append("img_brg", this.state.img_brg, this.state.img_brg.name);
      // }

      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.get_produk();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/produk";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({produk: response.data.produk});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
          <div className=" mt-5">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h2 className="#" style={{fontWeight:"700", textAlign:"center", fontSize:"40px"}} >Data Barang</h2>
                </div>
              </div>
              <div className="col-sm-3" style={{textAlign:"center"}}>
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table table-hover table-striped ">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.produk.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.kd_brg}</td>
                        <td>{item.nama_brg}</td>
                        <td>{item.jenis_brg}</td>
                        <td>{item.harga_brg}</td>
                        <td>{item.jmlh_brg}</td>
                        <td><img src={"http://localhost/eproduk/public/image/produk/" + item.img_brg} className="card-img-top" 
                        style={{width:"150px", height:"150px"}} /></td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}
              <center>
              <button className="btn btn-outline-dark my-2"  onClick={this.Add}>
                <span className="#" ></span> Tambah Data
              </button>
              </center>

              {/* form modal Barang*/}
              <Modal id="modal_produk" title="Form Produk" bg_header="dark" text_header="white">
                <form onSubmit={this.Save}>
                  Kode
                  <input type="text" className="form-control" name="kd_brg" value={this.state.kd_brg}
                    onChange={this.bind} required />
                  Nama
                  <input type="text" className="form-control" name="nama_brg"
                    value={this.state.nama_brg} onChange={this.bind} required />
                  Jenis
                  <input type="text" className="form-control" name="jenis_brg"
                    value={this.state.jenis_brg} onChange={this.bind} required />
                  Harga
                  <input type="text" className="form-control" name="harga_brg" 
                  value={this.state.harga_brg} onChange={this.bind} required />
                  Jumlah
                  <input type="text" className="form-control" name="jmlh_brg" 
                  value={this.state.jmlh_brg} onChange={this.bind} required />
                  Image
                  <input type="file" className="form-control" name="img_brg" 
                   onChange={this.bindImage} />

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>


        </div>
      );
    }



}
export default Admin;
