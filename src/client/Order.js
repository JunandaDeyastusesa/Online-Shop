import React,{Component} from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Cekout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carts: [],
      num: 0,
      total: 0,
      data_pengiriman: [],
    }    
    
        if(!localStorage.getItem("Token")){
          // direct ke halaman login
          window.location = "/login";
        }
    }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    getCarts = () => {
        let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let total = 0
        let num = 0
        items.forEach(item => {
          total += item.total
          num += item.qty
        });
        this.setState({
          carts: items,
          num: num,
          total: total
        });    
    }

    componentDidMount() {
        this.getCarts()
        this.get_alamat()
    }

    removeFromCart = (product) => {
        let carts = JSON.parse(localStorage.getItem('cart'));
        let cart = carts.filter(item => item.id !== product.id );
        localStorage.setItem('cart', JSON.stringify(cart));
        this.getCarts()

    }

    clearCart = () => {
        localStorage.removeItem('cart');
        this.setState({carts: []});    
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

    render(){
      const { carts, num, total, data_pengiriman} =  this.state;
      console.log(data_pengiriman);
      return(
        <div>
          <div className="container">
            <div className="py-5 text-center">
              <h2>Data Order</h2>
            </div>
            <div className="row">

            { !carts.length ? 
            
            <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Data Order</span>
                  <span className="badge badge-secondary badge-pill">0</span>
                </h4>
                <ul className="list-group mb-3">
                    <div>
                    <h3 className="text-secondary">No item on the order</h3>
                    </div>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (IDR)</span>
                      <strong>Rp.0</strong>
                    </li>
                    <button className="btn btn-danger float-right" onClick={this.clearCart} 
                        style={{ marginRight: "0px", marginTop:"10px" }}><span className="fa fa-trash"></span> Clear Cart
                    </button>
                    
                 </ul>  
              </div>
             :
            
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Your cart</span>
                  <span className="badge badge-secondary badge-pill">{num}</span>
                </h4>
                <ul className="list-group mb-3">
                    <div>{carts.map((product, index) =>            
                      <div key={index}>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                          <div>
                            <h6 className="my-0">{product.name}</h6>
                            <small className="text-muted">Harga {product.price}</small>
                          </div>
                          <span className="text-muted">Rp.{product.total}</span>
                        </li>
                      </div>
                      )} 
                    </div>
          
                    { carts.length ?
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (IDR)</span>
                      <strong>Rp.{total}</strong>
                    </li>: ''
                    }
                 </ul>
              </div>
              }
            

              <div className="col-md-8 order-md-1">
                <form className="needs-validation" noValidate>

                  <div className="row">
                    <div className="col mb-3 md-3">
                      <h4 htmlFor="country" style={{fontSize:"bold"}}>Alamat</h4>
                      
                        {data_pengiriman.map((item) => {
                          return(
                            <p>{item.id}{item.judul}/{item.kota}/{item.jalan}/{item.kecamatan}/{item.rt}/{item.rw}</p>
                            
                          )})}
                  
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                  </div>

                  <hr className="mb-4" />
                  {/* <button className="btn btn-primary btn-lg btn-block" type="submit" style={{marginTop:"110px"}}>
                    Continue to checkout
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default Cekout;


                 


  




