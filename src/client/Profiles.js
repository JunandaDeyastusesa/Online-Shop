import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/foto1.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      nama_lengkap: "",
      no_hp: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      find: "",
      message: "",
      img_user: null,

      data_pengiriman: [],
      id_pengiriman:"",
      nama_penerima:"",
      kode_pos:"",
      kecamatan:"",
      kota:"",
      jalan:"",
      rt:"",
      rw:"",
      judul:"",
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

    // bindImage = (event) => {
    //   this.setState({img_user: event.target.files[0]})
    // }

    Add_alamat = () => {
      
      $("#modal_alamat").modal("show");
      
      this.setState({
        action: "insert",
        id_pengiriman: "",
        id_user: "",
        nama_penerima: "",
        kode_pos: "",
        kecamatan: "",
        kota: "",
        jalan: "",
        rt: "",
        rw: "",
        judul: "",
      });
    }

    Edit_alamat = (item) => {
      // membuka modal
      $("#modal_alamat").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_pengiriman: item.id_pengiriman,
        id_user: item.id_user,
        nama_penerima: item.nama_penerima,
        kode_pos: item.kode_pos,
        kecamatan: item.kecamatan,
        kota: item.kota,
        jalan: item.jalan,
        rt: item.rt,
        rw: item.rw,
        judul: item.judul,
    
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_user: item.id_user,
        nama_user: item.nama_user,
        nama_lengkap: item.nama_lengkap,
        no_hp: item.no_hp,
        tanggal_lahir: item.tanggal_lahir,
        jenis_kelamin: item.jenis_kelamin,
        img_user: item.img_user
      });
      
    }
    
    get_profile = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))

      let url = "http://localhost/eproduk/public/user/"+id;
      axios.get(url)
      .then(response => {
        this.setState({
          user: response.data.user,
        });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }
    get_alamat = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))

      let url = "http://localhost/eproduk/public/address/"+id;
      axios.get(url)
      .then(response => {
        this.setState({
          data_pengiriman: response.data.data_pengiriman,
        });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }

    Drop_alamat = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/address/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_alamat();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/user"+id.user;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_user();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_profile();
      this.get_alamat();
    }

    Save = (event) => {
      console.log(this.state.img_user)
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/eproduk/public/user/save_profile";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("nama_user", this.state.nama_user);
      form.append("nama_lengkap", this.state.nama_lengkap);
      form.append("tanggal_lahir", this.state.tanggal_lahir);
      form.append("jenis_kelamin", this.state.jenis_kelamin);
      form.append("no_hp", this.state.no_hp);
      // form.append("img", this.state.img);
      form.append("img_user", this.state.img_user, this.state.img_user.name);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_profile();
      })
      .catch(error => {
        console.log(error);
      });
    }

    Save_alamat = (event) => {
      let id = JSON.parse(localStorage.getItem('id_user'))
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_alamat").modal("hide");
      let url = "http://localhost/eproduk/public/address/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_pengiriman", this.state.id_pengiriman);
      form.append("id_user", id);
      form.append("nama_penerima", this.state.nama_penerima);
      form.append("kode_pos", this.state.kode_pos);
      form.append("kecamatan", this.state.kecamatan);
      form.append("kota", this.state.kota);
      form.append("jalan", this.state.jalan);
      form.append("rt", this.state.rt);
      form.append("rw", this.state.rw);
      form.append("judul", this.state.judul);
      // form.append("img_user", this.state.img_user, this.state.img_user.name);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_alamat();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/profiles";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({profiles: response.data.profiles});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      const { user, data_pengiriman, item } = this.state;
      return(
        <div className="container">
          <div>
            
          <div style={{ paddingTop: "4%" }}>
            <div className="#" style={{ maxwidth: "200px" }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                {this.state.user.map((item) => { 
                  return(
                    <img src={'http://localhost/eproduk/public/image/user/' + item.img_user} style={{ height: "240px", width: "200px" }} />  
                    )
                    })}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title" style={{ fontWeight: "900" }}>Data Diri</h4>
                    <table class="table table-borderless">
                      {this.state.user.map((item) => { 
                        return(
                          <tbody>
                            <tr>
                              <tr>
                                <td>Username</td>
                                <td>: {item.nama_user}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>: {item.email}</td>
                              </tr>
                              <tr>
                                <td>Nama Lengkap</td>
                                <td>: {item.nama_lengkap}</td>
                              </tr>
                              <tr>
                                <td>Jenis Kelamin</td>
                                <td>: {item.jenis_kelamin}</td>
                              </tr>
                              <tr>
                                <td>Tanggal Lahir</td>
                                <td>: {item.tanggal_lahir}</td>
                              </tr>
                              <tr>
                                <td>No HP</td>
                                <td>: {item.no_hp}</td>
                              </tr>
                              <button className="m-1 btn btn-sm btn-outline-dark" onClick={() =>this.Edit(item)}>
                                <span className="fa fa-edit">Edit</span>
                              </button>
                            </tr>
                      </tbody>
                        )
                      })}
                      
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
            <h4 className="card-title" style={{ fontWeight: "900" }}>Data Pengiriman</h4>
            <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
            <div className="row"> 

            { this.state.data_pengiriman.map((item) => {
                    return(
                      <div className="col-sm-5">
                        <div className="card">
                          <div className="card-body">
                            <ul className="list-gruop list-gruop-flush">
                      <tr>
                      <tr>
                      <td>
                        <h5>Nama Penerima</h5>
                        <p>{item.nama_penerima}</p>
        
                        <h5>Kode Pos</h5>
                        <p>{item.kode_pos}</p>
        
                        <h5>Kecamatan</h5>
                        <p>{item.kecamatan}</p>
        
                        <h5>Kota</h5>
                        <p>{item.kota}</p>
                      </td>
                     
                      <td style={{paddingLeft:"60px"}}>
                        <h5>Jalan</h5>
                        <p>{item.jalan}</p>
        
                        <h5>Rt</h5>
                        <p>{item.rt}</p>

                        <h5>RW</h5>
                        <p>{item.rw}</p>

                        <h5>Judul</h5>
                        <p>{item.judul}</p>
                      </td>
                      </tr>
                          <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                            <span className="fa fa-edit">Edit</span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger" onClick={() => this.Drop_alamat(item.id_pengiriman)}>
                            <span className="fa fa-edit">Delete</span>
                          </button>
                    </tr>
                    </ul>
                          </div>
                        </div>
                    </div>
                      
                      );
                    })}
                    
            </div>
              <div>
                <button className="m-1 btn btn-sm btn-outline-success" onClick={this.Add_alamat}>
                  <span className="fa fa-edit">Tambah Alamat</span>
                </button>
              </div>
            <br/>
            
            </div>
          </div>

          <Modal id="modal_user" title="Form User" bg_header="primary" text_header="white">
                <form onSubmit={this.Save}>
                Username
                  <input type="text" className="form-control" name="nama_user"
                    value={this.state.nama_user} onChange={this.bind} required />
                Nama
                  <input type="text" className="form-control" name="nama_lengkap"
                    value={this.state.nama_lengkap} onChange={this.bind} required />
                  <div className="form-group">
                    <label htmlFor="role">Jenis Kelamin</label>
                    <select className="form-control" name="jenis_kelamin" value={this.state.value} onChange={this.bind} required>
                      <option value="laki-laki">Laki laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                  Tanggal Lahir
                  <input type="date" className="form-control" name="tanggal_lahir"
                    value={this.state.tanggal_lahir} onChange={this.bind} required />
                  Foto
                  <input type="file" className="form-control" name="img_user"
                   onChange={this.bindImage} />
                  Nomor HP
                  <input type="text" className="form-control" name="no_hp"
                    value={this.state.no_hp} onChange={this.bind} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>

              <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                <form onSubmit={this.Save_alamat}>
                Nama Penerima
                  <input type="text" className="form-control" name="nama_penerima"
                    value={this.state.nama_penerima} onChange={this.bind} required />
                  Kode Pos
                  <input type="text" className="form-control" name="kode_pos"
                    value={this.state.kode_pos} onChange={this.bind} required />
                  Kecamatan
                  <input type="text" className="form-control" name="kecamatan"
                    value={this.state.kecamatan} onChange={this.bind} required />
                  Kota
                  <input type="text" className="form-control" name="kota"
                    value={this.state.kota} onChange={this.bind} required />
                  Jalan
                  <input type="text" className="form-control" name="jalan"
                    value={this.state.jalan} onChange={this.bind} required />
                  RT
                  <input type="text" className="form-control" name="rt"
                    value={this.state.rt} onChange={this.bind} required />
                  RW
                  <input type="text" className="form-control" name="rw"
                    value={this.state.rw} onChange={this.bind} required />
                  Judul
                  <input type="text" className="form-control" name="judul"
                    value={this.state.judul} onChange={this.bind} required />
                  

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>

          </div>
        </div>
      );

    }



}
export default Profiles;
