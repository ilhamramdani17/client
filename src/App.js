import "./style/app.css"
import "./style/login.css"
import axios from "axios"
import Cookies from "js-cookie"
import Load from "./components/Load"
import Main from "./components/Main"
import Hero from "./components/Hero"
import Login from "./components/Login"
import Populer from "./components/Populer"
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import platform from "platform"
import Kategori from "./components/Kategori";
import React, { useEffect, useState } from "react";

const App = () => {
  
  const [user,setUser] = useState('')
  const [load,setLoad] = useState(false)
  const [login,setLogin] = useState(false)
  const [daftar,setDaftar] = useState(false)
  const [addPost,setAddPost] = useState(false)
  const [detail,setDetail] = useState(false)
  const [kategori,setKategori] = useState('')
  const [viewer,setViewer] = useState(false)
  const [alert,setAlert] = useState(false)
  const [notif,setNotif] = useState(false)
  const [browser,setBrowser] = useState('')
  const [setting,setSetting] = useState(false)
  const [postsDetail,setPostsDetail] = useState([])
  const [notifikasi,setNotifikasi] = useState('')
  const [kategorikPosts,setKategorikPosts] = useState([])
  
  useEffect(() => {
    setBrowser(platform.name)
    const url = window.location.href.split("=")[1];
    if (url) {
        axios.post("http://localhost:8000/getPostById",{_id: url})
        .then((result) => {
          setPostsDetail([])
          setAddPost(false)
          setDetail({
            "bool": true,
            "post": [result.data[0]]
          })
        })
      }
  },[])

  useEffect(() => {
    let token = Cookies.get('auth')
    if (token !== undefined) {
      axios.post("http://localhost:8000/getUserByToken",{token: token})
      .then((result) => {
        if (result.data.auth == true) {
          setUser(result.data.user);
        }
      })
    }
  },[user])

  function handleBeranda (data) {
    setLoad(true)
    setDetail(false)
    setAddPost(false)
    setKategori(data)
  }
  
  function handleDetail (detail,post) {
    setLoad(true)
    axios.post("http://localhost:8000/getPostByKategori",{kategori: post.kategori,user: user})
    .then((result) => {
      let data = []
      result.data.map((item) => {
        if (item._id !== post._id) {
          data.push(item)
        }
      })
      setKategorikPosts(data);
      setLoad(false)
    })
    setPostsDetail([])
      setAddPost(false)
      setDetail({
        "bool": detail,
        "post": [post]
      })
    }

  function handleLogin () {
    setLogin(false)
    setDaftar(false)
  }

  return (
    <div className="App">
      {load
        ? <Load />
        : ""
      }
      {alert.bool
        ? <Alert alert={alert} setAlert={setAlert}/>
        : ""
      }
      < Navbar user={user} setUser={setUser} browser={browser} setLoad={setLoad} setAlert={setAlert} addPost={addPost} setAddPost={setAddPost} setDetail={setDetail} handleDetail={handleDetail} notif={notif} setNotif={setNotif} setting={setting} setSetting={setSetting} notifikasi={notifikasi}/>
      < Kategori user={user} setUser={setUser} login={login} setLogin={setLogin} setLoad={setLoad} setKategori={setKategori} setDetail={setDetail} setAddPost={setAddPost} handleBeranda={handleBeranda}/>
      {detail.bool
        ?
          ""
        :
          < Hero viewer={viewer} setLoad={setLoad} handleDetail={handleDetail}/>
      }
      < Populer user={user} browser={browser} addPost={addPost} setAddPost={setAddPost} viewer={viewer} setDetail={setDetail} handleDetail={handleDetail}/>
      < Main user={user} setUser={setUser} browser={browser} setLoad={setLoad} setLogin={setLogin} setAlert={setAlert} addPost={addPost} setSetting={setSetting} kategorikPosts={kategorikPosts} postsDetail={postsDetail} setPostsDetail={setPostsDetail} detail={detail} viewer={viewer} setViewer={setViewer} setAddPost={setAddPost} kategori={kategori} handleDetail={handleDetail}/>
      {login
        ?
          <div className="loginContainer">
            <div className="close" onClick={() => handleLogin()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            </div>
                <Login setUser={setUser} daftar={daftar} setLoad={setLoad} setLogin={setLogin} setDaftar={setDaftar} setAlert={setAlert}/>
          </div>
        :
          ""
      }
    </div>
  )
  
}

export default App;
