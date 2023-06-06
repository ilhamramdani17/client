import "../style/login.css";
import axios from "axios";
import Cookies from "js-cookie"
import React, {useState,useEffect} from "react";

const Login = (props) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    // useEffect(() => {
    //     /* google google */
    //     google.accounts.id.initialize({
    //         client_id: "486563467306-7666pj21vc33d6an0oa8237copca3fjt.apps.googleusercontent.com",
    //         callback: handleGoogleLogin
    //     })
    //     google.accounts.id.renderButton(
    //         document.getElementById("googleLogin"),
    //         {theme: "outline",size: "large"}
    //     )

    // },[])
    
    function handleGoogleLogin (response) {
            console.log(response.credential);
    }

    async function handleLogin (e) {
        e.preventDefault();
        props.setLoad(true)
        const result = await axios.post("http://localhost:8000/login", {
            data: {
                email: email,
                password: password
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

    return (
    <div className="Login">
      <div className="heroLogin">
        <div className="header">
            <h1>DoBoX</h1>
            <strong>DoBoX Membantu Membuat Hidup Anda Menjadi Lebih Dengan Menyediakan Document Untuk Membantu Kerja Dan Tugas Anda</strong>
        </div>
        <div className="body">
            <h3>Atau Login Dari</h3>
            <div className="facebook">
                Facebook
            </div>
            <div className="google" id="googleLogin">
                Google
            </div>
        </div>
      </div>
      <div className="formLogin">
        <div className="formHead">
            <h1>Login</h1>
        </div>
        <div className="formBody">
            <form onSubmit={handleLogin}>
                <div className="formEmail">
                    <label>Email</label>
                    <input type="email" value={email} placeholder="masukkan email di sini" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="formPassword">
                    <label>Password</label>
                    <input type="password" value={password} placeholder="masukkan password di sini" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="buttonLogin">
                    <button>Login</button>
                </div>
            </form>
        </div>
        <div className="formFooter">
            <p>Belum Punya Akun ? <small onClick={() => props.setDaftar(!props.daftar)}>Daftar Akun</small></p>
        </div>
      </div>
    </div>
    )
}

export default Login;