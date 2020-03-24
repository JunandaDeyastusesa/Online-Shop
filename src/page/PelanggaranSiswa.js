import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Toast from "../component/Toast";
import Modal from "../component/Modal";

class PelanggaranSiswa extends Component {
constructor() {
super();
this.state = {
siswa: [],
pelanggaran_siswa: [],
pelanggaran: [],
id_pelanggaran: "",
list_pelanggaran: [],
id_siswa: ""
}

// jika tidak terdapat data token pada local storage
if(!localStorage.getItem("Token")){
// direct ke halaman login
window.location = "/login";
}

}

bind = (event) => {
this.setState({[event.target.name]: event.target.value});
}

get_siswa = () => {
// tampilkan loading
$("#loading").toast("show");
let url = "http://localhost/pelanggaran_sekolah/public/siswa";
axios.get(url)
.then(response => {
// hilangkan loading
$("#loading").toast("hide");
this.setState({siswa: response.data.siswa});
})
.catch(error => {
console.log(error);
});
}


get_pelanggaran = () => {
let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran";
axios.get(url)
.then(response => {
this.setState({pelanggaran: response.data.pelanggaran});
})
.catch(error => {
console.log(error);
});
}

get_pelanggaran_siswa = () => {
let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa";
axios.get(url)
.then(response => {
this.setState({pelanggaran_siswa: response.data.pelanggaran_siswa});
})
.catch(error => {
console.log(error);
});
}

componentDidMount(){
this.get_pelanggaran_siswa();
this.get_siswa();
this.get_pelanggaran();
}

AddPelanggaran = () => {
if (this.state.id_pelanggaran !== "") {
let id = this.state.id_pelanggaran;
let item = this.state.pelanggaran.find(itm => itm.id_pelanggaran == id);
console.log(item);
let temp = this.state.list_pelanggaran;
temp.push(item);
this.setState({list_pelanggaran: temp});
}
}

DropList = (index) => {
let temp = this.state.list_pelanggaran;
temp.splice(index,1);
this.setState({list_pelanggaran: temp});
}

Add = () => {
$("#modal_pelanggaran").modal("show");
this.setState({
id_siswa: "",
id_pelanggaran: "",
list_pelanggaran: []
});
}

Save = (event) => {
event.preventDefault();
// tampilkan loading
$("#loading").toast("show");

// tutup form modal pelanggaran siswa
$("#modal_pelanggaran").modal("hide");
let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa/save";
// ambil data user dari local storage
let user = JSON.parse(localStorage.getItem("user"));
let form = new FormData();
form.append("id_siswa", this.state.id_siswa);
form.append("id_user", user.id_user);
form.append("detail_pelanggaran", JSON.stringify(this.state.list_pelanggaran));
axios.post(url,form)
.then(response => {
// hilangkan loading
$("#loading").toast("hide");
this.get_pelanggaran_siswa();
this.setState({list_pelanggaran: []});
// tampilkan pesan
$("#message").toast("show");
})
.catch(error => {
console.log(error);
});
}

Drop = (id_pelanggaran_siswa) => {
if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
// tampilkan loading
$("#loading").toast("show");
let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa/drop/"+id_pelanggaran_siswa;
axios.delete(url)
.then(response => {
// tampilkan loading
$("#loading").toast("show");
this.setState({message: response.data.message});
this.get_pelanggaran_siswa();

// tampilkan pesan
$("#message").toast("show");
})
.catch(error => {
console.log(error);
});
}
}

render(){
return(
<div className="container">
<div className="my-2">
<div className="#">
<h4 className="#" style={{fontWeight:"700", textAlign:"center", fontSize:"35px"}}>Data Pelanggaran Siswa</h4>
</div>
<div className="#">
<Toast id="loading" autohide="false" title="Informasi">

<span className="fa fa-spin fa-spinner"></span> Memuat Data...

</Toast>

<Toast id="message" autohide="true" title="Informasi">

{ this.state.message }
</Toast>
<table className="table table-sm table-hover">
<thead className="thead-dark">
<tr>
<td>Tanggal</td>
<td>Nama Siswa</td>
<td>Pelanggaran</td>
<td>Opsi</td>
</tr>
</thead>
<tbody>
{ this.state.pelanggaran_siswa.map(item => {
return(
<tr key={item.id_pelanggaran_siswa}>
<td>{item.waktu}</td>
<td>{item.nama_siswa}</td>
<td>
<ul>
{ item.detail_pelanggaran.map(it => {
return(
<li key={it.id_pelanggaran}>
{it.nama_pelanggaran}
</li>
);
}) }
</ul>
</td>
<td>
<button className="btn btn-sm btn-danger"
onClick={() => this.Drop(item.id_pelanggaran_siswa)}>
<span className="fa fa-trash"></span> Hapus
</button>
</td>
</tr>
);
}) }
</tbody>
</table>

<button className="btn btn-outline-dark my-2" onClick={this.Add}>
<span className="fa"></span> Tambah Data
</button>
</div>
</div>


{/* form modal pelanggaran siswa*/}
<Modal id="modal_pelanggaran" bg_header="secondary" text_header="white">
<form onSubmit={this.Save}>
Nama Siswa

<select name="id_siswa" className="form-control" value={this.state.id_siswa}

onChange={this.bind} required>
<option value="">Pilih Siswa</option>
{ this.state.siswa.map(item => {
return (
<option key={item.id_siswa} value={item.id_siswa}>
{item.nama_siswa}

</option>
);
}) }
</select>
Pilih Pelanggaran
<select name="id_pelanggaran" className="form-control"
value={this.state.id_pelanggaran}
onChange={this.bind} required>
<option value="">Pilih Pelanggaran</option>
{ this.state.pelanggaran.map(item => {
return (
<option key={item.id_pelanggaran} value={item.id_pelanggaran}>
{item.nama_pelanggaran}
</option>
);
}) }
</select>

<button type="button" className="btn btn-block btn-sm btn-outline-info my-4"
onClick={this.AddPelanggaran}>
Tambahkan Pelanggaran
</button>
Jenis Pelanggaran: <br />
<ul>
{this.state.list_pelanggaran.map((item,index) => {
return (
<li key={item.id_pelanggaran+index}>
{item.nama_pelanggaran}

[<a className="text-danger" onClick={() => this.DropList(index)}>X</a>]

</li>
);
})}
</ul>

<button className="pull-right btn btn-outline-info my-2" type="submit">
<span className="fa"></span> Simpan
</button>
</form>
</Modal>
</div>
);
}
}
export default PelanggaranSiswa;
