import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      username: "",
      password: "",
      action: "",
      find: "",
      message: ""
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

    Add = () => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id_user: "",
        nama_user:"",
        username: "",
        password: ""
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
        username: item.username,
        password: item.password
      });
    }

    get_user = () => {
      $("#loading").toast("show");
      let url = "http://localhost/pelanggaran_sekolah/public/user";
      axios.get(url)
      .then(response => {
        this.setState({user: response.data.user});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/public/user/drop/"+id;
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
      this.get_user();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/pelanggaran_sekolah/public/user/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("nama_user", this.state.nama_user);
      form.append("username", this.state.username);
      form.append("password", this.state.password);
      axios.post(url, form)
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

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/user";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({user: response.data.user});
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
                  <h4 className="#" style={{fontWeight:"600", textAlign:"center", fontSize:"35px"}} >Data User</h4>
                </div>
              </div>
              <div className="col-sm-3">
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
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.user.map((item) => {
                    return(
                      <tr key={item.id_user}>
                        <td>{item.nama_user}</td>
                        <td>{item.username}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id_user)}>
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
              <button className="btn btn-outline-secondary my-2" onClick={this.Add}>
                <span className="fa"></span> Tambah Data
              </button>
              </center>

              {/* form modal siswa*/}
              <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                  Nama
                  <input type="text" className="form-control" name="nama_user"
                    value={this.state.nama_user} onChange={this.bind} required />
                  Username
                  <input type="text" className="form-control" name="username"
                    value={this.state.username} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
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
export default User;
