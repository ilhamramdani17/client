import "../style/daftar.css";
import axios from "axios";
import React, {useState} from "react";

const Daftar = (props) => {
    const [error,setError] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [profesi,setProfesi] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")

    async function handleDaftar (e) {
        e.preventDefault();
            if (password.length < 8) {
            setError({
                "code": "pass",
                "mssg": "Kekuatan Password Lemah"
            })
        }else if (password !== confirm) {
            setError({
                "code": "confirm",
                "mssg": "konfirmasi password salah"
            })
        }else if (profesi == "kosong") {
            setError({
                "code": "kosong",
                "mssg": "Profesi Tidak Boleh Kosong"
            })
        }else {
            setError("")
            const result = await axios.post("http://localhost:8000/daftar",{
                data: {
                    username: username,
                    email: email,
                    profesi: profesi,
                    password: password
                }
            })
            if (result.data.status === "success") {
                props.setDaftar(!props.daftar)
                props.setAlert({
                    "bool": true,
                    "status": result.data.status,
                    "msg": result.data.mssg
                }) 
            } else {
                props.setDaftar(!props.daftar)
                props.setAlert({
                    "bool": true,
                    "status": result.data.status,
                    "msg": result.data.mssg
                })
            }
        }
    }

    return (
    <div className="Daftar">
        <div className="heroDaftar">
            <div className="header">
                <h1>DoBoX Daftar Akun</h1>
            </div>
        </div>
        <div className="formDaftar">
        <div className="formBody">
            <form onSubmit={(handleDaftar)}>
                <div className="formEmail">
                    <label>Username</label>
                    <input type="text" value={username}  placeholder="masukkan username di sini" onChange={(e) => setUsername
                    (e.target.value)} required/>
                </div>
                <div className="formEmail">
                    <label>Email</label>
                    <input type="email" value={email} placeholder="masukkan email di sini" onChange={(e) => setEmail
                    (e.target.value)} required/>
                    {error.code == "exits" ? <p className="error">{error.mssg}</p> : ""}
                </div>
                <div className="profesi">
                        <label>profesi :</label>
                        <input value={profesi} placeholder="pilih profesi anda" onChange={(e) => setProfesi(e.target.value)}/>
                        <select name="Category" onChange={(e) => setProfesi(e.target.value)} required>
                            <option value="kosong">pilih...</option>
                            <option value="guru">guru</option>
                            <option value="dosen">dosen</option>
                            <option value="profesor">profesor</option>
                            <option value="petani">petani</option>
                            <option value="buruh">buruh</option>
                            <option value="karyawan">karyawan</option>
                        </select>
                        {error.code == "kosong" ? <p className="error">{error.mssg}</p> : ""}
                </div>
                <div className="formPassword">
                    <label>Password</label>
                    <input type="password" value={password} placeholder="masukkan password di sini" onChange={(e) => setPassword
                    (e.target.value)} required/>
                    {error.code == "pass" ? <p className="error">{error.mssg}</p> : ""}
                </div>
                <div className="formPassword">
                    <label>Konfirmasi Password</label>
                    <input type="password" value={confirm} placeholder="konfirmasi password di sini" onChange={(e) => setConfirm
                    (e.target.value)} required/>
                    {error.code == "confirm" ? <p className="error">{error.mssg}</p> : ""}
                </div>
                <div className="buttonLogin">
                    <button>Daftar Akun</button>
                </div>
            </form>
        </div>
        <div className="formFooter">
            <p>Sudah Punya Akun ? <small onClick={() => props.setDaftar(!props.daftar)}>Login Sekarang</small></p>
        </div>
        </div>
    </div>
    )
}

export default Daftar;