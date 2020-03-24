import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "User",
      action: "insert",
      find: "",
      message: ""
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    Save = (event) => {
      const { password, confirmpassword } = this.state;
      if (password !== confirmpassword) {
        alert("password don't match");
      } else {
      event.preventDefault();
      $("#modal_user").modal("hide");
      let url = "http://localhost/eproduk/public/user/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("nama_user", this.state.nama_user);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        window.location="/Login"
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

    render(){
      return(
        <div className="container" style={{width: 24 + "rem", paddingTop : 6 + '%'}}>
        <div className="card-body">
          <div className="# ">
            <h2 className="#" style={{textAlign: "center"}}>Register User</h2>
          </div>
          <form onSubmit={this.Save}>
                    
                  <input type="text" className="form-control my-4" name="nama_user"
                    value={this.state.nama_user} onChange={this.bind} required placeholder="Masukkan Nama"  />
                    
                  <input type="text" className="form-control my-4" name="email"
                    value={this.state.email} onChange={this.bind} required placeholder="Masukkan Email" />
                    
                  <input type="text" className="form-control my-4" name="password"
                    value={this.state.password} onChange={this.bind} required placeholder="Masukkan Password" />
                  
                  <input type="text" className="form-control my-4" name="confirmpassword"
                    value={this.state.confirmpassword} onChange={this.bind} required placeholder="Confirm Password" />
                  <p>Sudah Punya Akun? 
                  <Link to="/Login">
                  Login
                  </Link></p>

                  
                  <button className="mt-2 btn btn-block btn-success" type="submit">
                <span className="#"></span> Simpan
                </button>
                </form>
          </div>
        </div>


      );
    }
}
export default Register;
