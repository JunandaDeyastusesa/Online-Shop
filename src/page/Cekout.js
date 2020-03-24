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
        <div className="container">
          <h1 style={{textAlign:"center", marginTop:"100px"}}>Halaman Ini Tidak Tersedia</h1>
        </div>
      );
    }
}
export default Cekout;


                 


  




