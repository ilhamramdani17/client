import axios from "axios"
import "../style/setting.css";
import Cookies from "js-cookie";
import Display from "./Display"
import { useEffect, useState } from "react";

const Setting = (props) => {

    const [datas,setDatas] = useState([])
    const [posts,setPosts] = useState([])
    const [display,setDisplay] = useState(false)

    useEffect(() => {
        axios.post("http://localhost:8000/getPostByUser",{id: props.user._id})
        .then((result) => {
            setPosts(result.data)
        })
    },[])

    function handleDisplay (identi) {
        if (identi == "viewPost") {
            setDatas({
                "type": "post",
                "data": posts
            })
            setDisplay(true)
        }else if (identi == "viewSubscriber") {
            axios.post("http://localhost:8000/getSubs",{subs: props.user.subscriber})
            .then((result) => {
                setDisplay(true)
                setDatas({
                    "type": "subscriber",
                    "data": result.data
                });
            })
        }else {
            axios.post("http://localhost:8000/getSubs",{subs: props.user.subscribing})
            .then((result) => {
                setDisplay(true)
                setDatas({
                    "type": "subscribing",
                    "data": result.data
                });
            })
        }
    }

    function handleSave () {
        axios.post("http://localhost:8000/getSave",{save: props.user.savePost})
            .then((result) => {
                setDisplay(true)
                setDatas({
                    "type": "post",
                    "desc": "save",
                    "data": result.data
                });
            })
    }

    function handleHide () {
        axios.post("http://localhost:8000/getHide",{hide: props.user.hidenPost})
            .then((result) => {
                console.log(result.data);
                setDisplay(true)
                setDatas({
                    "type": "post",
                    "desc": "hide",
                    "data": result.data
                });
            })
    }

    function handleLogout () {
        props.setUser('')
        Cookies.remove('auth')
        props.setDetail(false)
        props.setSetting(false)
        props.setAddPost(false)
    }

    return (
        <div className="Setting" onMouseLeave={() => props.setSetting(false)}>
            <div className="pic">
                <div className="button-pic">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="bio">
                <div className="name">
                    <strong>{props.user.username}</strong>
                    <small>{props.user.profesi}</small>

                </div>
                <div className="user-bio">
                    <div onClick={() => handleDisplay("viewPost")}>
                        <strong>Unggahan</strong>
                        <p>{posts.length}</p>
                    </div>
                    <div onClick={() => handleDisplay("viewSubscriber")}>
                        <strong>Subscriber</strong>
                        <p>{props.user.subscriber.length}</p>
                    </div>
                    <div onClick={() => handleDisplay("viewSubscribing")}>
                        <strong>Subscribing</strong>
                        <p>{props.user.subscribing.length}</p>
                    </div>
                </div>
            </div>
                {display
                ?
                    <div className="dis">
                            <Display datas={datas} browser={props.browser} user={props.user} setSetting={props.setSetting} handleDetail={props.handleDetail}/>
                    </div>
                :
                    ""
                }
                <div className="save" onClick={() => handleSave ()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                    <h4>Unggahan Disimpanan</h4>
                </div>
                <div className="hide" onClick={() => handleHide ()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => props.setViewer(false)}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <h4>Unggahan Disembunyikan</h4>
                </div>
                <div className="log" onClick={() => handleLogout()}>
                        <h3>Logout</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                </div>
        </div>
    )
}

export default Setting;