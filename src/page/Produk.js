import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Produk extends Component {
  constructor() {
    super();
    this.state = {
      produk: [],
      id_brg: "",
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
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
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
      form.append("id_brg", this.state.id_brg);
      form.append("kd_brg", this.state.kd_brg);
      form.append("nama_brg", this.state.nama_brg);
      form.append("jenis_brg", this.state.jenis_brg);
      form.append("harga_brg", this.state.harga_brg);
      form.append("jmlh_brg", this.state.jmlh_brg);
      form.append("img_brg", this.state.img_brg, this.state.img_brg.name);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        // $("#message").toast("show");
        this.get_produk();
      })
      .catch(error => {
        console.log(error);
      });
    }

    render(){
      return(
        <div className="container">
          <div className=" mt-5">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h2 className="#" style={{fontWeight:"700", textAlign:"center", fontSize:"40px"}} >Daftar Produk</h2>
                </div>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4" style={{textAlign:"center"}}>
            { this.state.produk.map((item) => {
                return(
                  <div className="col mb-4">
                    <div className="card h-100"> 
                      <img src={"http://localhost/eproduk/public/image/produk/" + item.img_brg} className="card-img-top" style={{width:"100%", height:"45%"}} alt="..." />
                        <div class="card-body">
                        <h3 className="card-title">{item.nama_brg}</h3>
                        <p className="card-text">Harga : Rp.{item.harga_brg} <br /> Stok : {item.jmlh_brg}</p>

                        {item.jmlh_brg > 0 ?
                        <a className="btn btn-primary">Buy</a> :
                        <p className="card-text"><small className="text-muted">Out of Stok</small></p>
                        }
                        
                        </div>
                    </div>
                  </div>
                );
            })}
            </div>
            </div>
        </div>
      );
    }
}
export default Produk;




