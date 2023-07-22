import "../style/login.css";
import axios from "axios";
import Active from "./Active.js";
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"
import React, {useState,useEffect} from "react";

const Login = (props) => {
    
    const [active,setActive] = useState(false)
    const [error,setError] = useState("")
    const [email,setEmail] = useState("")
    const [profesi,setProfesi] = useState("")
    const [confirm,setConfirm] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [emailLogin,setEmailLogin] = useState("")
    const [passwordLogin,setPasswordLogin] = useState("")
    
    async function handleGoogleLogin (response) {
        props.setLoad(true)
        var userObject = jwt_decode(response.credential)
        if (userObject.email_verified) {
            const result = await axios.post("http://localhost:8000/daftar",{
                data: {
                    method: "google",
                    username: userObject.name,
                    email: userObject.email,
                    profesi: 'dosen',
                    password: userObject.email
                }
            })
            if (result.data.status == "success") {
                const result = await axios.post("http://localhost:8000/login", {
                    data: {
                        email: userObject.email,
                        password: userObject.email
                    }
                })
                if (result.data.status == "success") {
                    props.setLoad(false)
                    props.setLogin(false)
                    props.setDaftar(false)
                    props.setUser(result.data.payload)
                    Cookies.set('auth', result.data.payload.token)
                    props.setAlert({
                        "bool": true,
                        "status": result.data.status,
                        "msg": result.data.mssg
                    })
                }else {
                    props.setLoad(false)
                    props.setAlert({
                        "bool": true,
                        "status": "error",
                        "msg": "login gagal"
                    })
                }
            }else {
                const result = await axios.post("http://localhost:8000/login", {
                    data: {
                        email: userObject.email,
                        password: userObject.email
                    }
                })
                if (result.data.status == "success") {
                    props.setLoad(false)
                    props.setLogin(false)
                    props.setDaftar(false)
                    props.setUser(result.data.payload)
                    Cookies.set('auth', result.data.payload.token)
                    props.setAlert({
                        "bool": true,
                        "status": result.data.status,
                        "msg": result.data.mssg
                    })
                }else {
                    props.setLoad(false)
                    props.setAlert({
                        "bool": true,
                        "status": "error",
                        "msg": "login gagal"
                    })
                } 
            }
        }else {
            props.setLoad(false)
            props.setAlert({
                "bool": true,
                "status": "error",
                "msg": "akun belum di verifikasi"
            })
        }
    }

    useEffect(() => {
        /* google google */
        google.accounts.id.initialize({
            client_id: "486563467306-7666pj21vc33d6an0oa8237copca3fjt.apps.googleusercontent.com",
            callback: handleGoogleLogin
        })
        google.accounts.id.renderButton(
            document.getElementById("googleLogin"),
            {theme: "outline",size: "large"}
        )
    },[])

    async function handleLogin (e) {
        e.preventDefault();
        props.setLoad(true)
        const result = await axios.post("http://localhost:8000/login", {
            data: {
                email: emailLogin,
                password: passwordLogin
            }
        })
        if (result.data.status === "success") {
            props.setLoad(false)
            props.setLogin(false)
            props.setDaftar(false)
            props.setUser(result.data.payload)
            Cookies.set('auth', result.data.payload.token)
            props.setAlert({
                "bool": true,
                "status": result.data.status,
                "msg": result.data.mssg
            })
        }else {
            props.setLoad(false)
            props.setLogin(false)
            props.setDaftar(false)
            props.setAlert({
                "bool": true,
                "status": result.data.status,
                "msg": result.data.mssg
            }) 
        }
    }

    async function handleDaftar (e) {
        e.preventDefault();
        props.setLoad(true)
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
                props.setLoad(false)
            } else {
                props.setDaftar(!props.daftar)
                props.setAlert({
                    "bool": true,
                    "status": result.data.status,
                    "msg": result.data.mssg
                })
                props.setLoad(false)
            }
        }
    }

    return (
    <div className="Login">
        {active
        ? <Active setLoad={props.setLoad} setAlert={props.setAlert} setActive={setActive}/>
        : ""
        }
      <div className="heroLogin">
        <div className="header">
            <h1>DoBoX</h1>
            <strong>DoBoX Membantu Membuat Hidup Anda Menjadi Lebih Dengan Menyediakan Document Untuk Membantu Kerja Dan Tugas Anda</strong>
        </div>
        <div className="body">
            <h3>Atau Login Dari</h3>
            <div className="google" id="googleLogin">
                Google
            </div>
            <div className="aktivasi" onClick={() => setActive(!active)}>
                Aktivasi Akun
            </div>
        </div>
      </div>
      <div className="bodyLogin">
        <div className="formLogin">
            <div className="formHead">
                <h2>Login</h2>
            </div>
            <div className="formBody">
                <form onSubmit={handleLogin}>
                    <div className="formEmail">
                        <label>Email</label>
                        <input type="email" value={emailLogin} placeholder="masukkan email di sini" onChange={(e) => setEmailLogin(e.target.value)} required/>
                    </div>
                    <div className="formPassword">
                        <label>Password</label>
                        <input type="password" value={passwordLogin} placeholder="masukkan password di sini" onChange={(e) => setPasswordLogin(e.target.value)} required/>
                    </div>
                    <div className="buttonLogin">
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="Daftar">
            <div className="heroDaftar">
                <div className="header">
                    <h2>Daftar</h2>
                </div>
            </div>
            <div className="formDaftar">
            <div className="formBody">
                <form onSubmit={(handleDaftar)}>
                    <div className="formEmail">
                        <label>Email</label>
                        <input type="email" value={email} placeholder="masukkan email di sini" onChange={(e) => setEmail
                        (e.target.value)} required/>
                        {error.code == "exits" ? <p className="error">{error.mssg}</p> : ""}
                    </div>
                    <div className="formEmail">
                        <label>Username</label>
                        <input type="text" value={username}  placeholder="masukkan username di sini" onChange={(e) => setUsername
                        (e.target.value)} required/>
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
            </div>
        </div>
    </div>
    </div>
    )
}

export default Login;