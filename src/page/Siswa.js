import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Siswa extends Component {
  constructor() {
    super();
    this.state = {
      siswa: [],
      id_siswa: "",
      nama_siswa: "",
      poin: "0",
      kelas: "",
      action: "",
      find: "",
      message: ""
    }

    
    if(!localStorage.getItem("Token")){
    
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    Add = () => {
      
      $("#modal_siswa").modal("show");
      
      this.setState({
        action: "insert",
        id_siswa: "",
        nis: "",
        nama_siswa: "",
        kelas: "",
        poin: 0
      });
    }

    Edit = (item) => {
      
      $("#modal_siswa").modal("show");
     
      this.setState({
        action: "update",
        id_siswa: item.id_siswa,
        nis: item.nis,
        nama_siswa: item.nama_siswa,
        kelas: item.kelas,
        poin: item.poin
      });
    }

    get_siswa = () => {
      $("#loading").toast("show");
      let url = "http://localhost/pelanggaran_sekolah/public/siswa";
      axios.get(url)
      .then(response => {
        this.setState({siswa: response.data.siswa});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/public/siswa/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_siswa();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_siswa();
      
    }

    Save = (event) => {
      event.preventDefault();
     
      $("#loading").toast("show");
      
      $("#modal_siswa").modal("hide");
      let url = "http://localhost/pelanggaran_sekolah/public/siswa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_siswa", this.state.id_siswa);
      form.append("nis", this.state.nis);
      form.append("nama_siswa", this.state.nama_siswa);
      form.append("kelas", this.state.kelas);
      form.append("poin", this.state.poin);
      axios.post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_siswa();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/public/siswa";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({siswa: response.data.siswa});
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
                  <h2 className="#" style={{fontWeight:"700", textAlign:"center", fontSize:"40px"}} >Data Siswa</h2>
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
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Poin</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.siswa.map((item) => {
                    return(
                      <tr key={item.id_siswa}>
                        <td>{item.nis}</td>
                        <td>{item.nama_siswa}</td>
                        <td>{item.kelas}</td>
                        <td><div class="badge badge-warning">{item.poin}</div></td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id_siswa)}>
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

              {/* form modal siswa*/}
              <Modal id="modal_siswa" title="Form Siswa" bg_header="dark" text_header="white">
                <form onSubmit={this.Save}>
                  NIS
                  <input type="text" className="form-control" name="nis" value={this.state.nis}
                    onChange={this.bind} required />
                  Nama
                  <input type="text" className="form-control" name="nama_siswa"
                    value={this.state.nama_siswa} onChange={this.bind} required />
                  Kelas
                  <input type="text" className="form-control" name="kelas"
                    value={this.state.kelas} onChange={this.bind} required />
                  Poin
                  <input type="number" className="form-control" name="poin" value={this.state.poin}
                    onChange={this.bind} required />
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
export default Siswa;
