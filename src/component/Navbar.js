import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("role");
    window.location = "/"
  }
  
  render() {
    let role = localStorage.getItem("role");
    let auth = localStorage.getItem("Token");
    return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">REACT SHOP</a>
              
              <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">
            {/* {(auth)= "true" ? <li className="navbar-item"><Link className="nav-link" to="/Admin">Admin</Link></li> : "" }             */}
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/Admin">Admin</Link></li> : "" : "" }            
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/User">User</Link></li> : "" : "" }       
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/Order">Order</Link></li> : "" : "" }            
            

            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/">Produk</Link></li> } 
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/profile">Profile</Link></li> }           
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/cart">Cart</Link></li> }            
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/Cekout">Check Out</Link></li> }            
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/OrderC">Order</Link></li> }            
          </ul>
        </div>
                <div className="form-inline my-2 my-lg-0">
                  <ul className="navbar-nav">
                    {!(auth) ? <li className="navbar-item"><Link className="nav-link" to="/login">login</Link></li> : 
                    <li className="navbar-item"><Link className="nav-link" onClick={this.Logout}>Logout</Link></li> }
                </ul>
                </div>
             
            </nav>
      </div>
      
    );
  }
}
export default Navbar;
