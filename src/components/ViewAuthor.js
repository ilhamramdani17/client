import axios from "axios";
import "../style/viewAuthor.css"
import { useEffect, useState } from "react";

const ViewAuthor = (props) => {
    const [posts,setPosts] = useState('')

    useEffect(() => {
        let data = []
        props.posts.map((post) => {
            if (post.userid === props.id) {
                data.push(post)
            }
        })
        setPosts(data)
    },[])

    function handleSubscribe (id) {
        props.setLoad(true)
        axios.post("http://localhost:8000/addSubscribe",{userid: id,id: props.user._id,username: props.user.username})
        .then((result) => {
            props.setUserDetail(result.data.payload.user2[0]);
            props.setUser(result.data.payload.user1[0]);
            props.setLoad(false)
            props.setAlert({
                "bool": true,
                "status": result.data.status,
                "msg": result.data.mssg
            }) 
        })
    }
    function handleUnsubscribe (id) {
        props.setLoad(true)
        axios.post("http://localhost:8000/Unsubscribe",{userid: id,id: props.user._id,username: props.user.username})
        .then((result) => {
            props.setUserDetail(result.data.payload.user2[0]);
            props.setUser(result.data.payload.user1[0]);
            props.setAlert({
                "bool": true,
                "status": result.data.status,
                "msg": result.data.mssg
            }) 
            props.setLoad(false)
        })
    }

    return (
        <div className="viewAuthor" onMouseLeave={() => props.setViewAuthor(false)}>
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
                    <strong>{props.userDetail.username}</strong>
                    <small>{props.userDetail.profesi}</small>

                </div>
                <div className="user-bio">
                    <div>
                        <strong>Unggahan</strong>
                        <p>{posts.length}</p>
                    </div>
                    <div>
                        <strong>Subscriber</strong>
                        <p>{props.userDetail ? props.userDetail.subscriber.length : "0"}</p>
                    </div>
                    <div>
                        <strong>Subscribing</strong>
                        <p>{props.userDetail ? props.userDetail.subscribing.length : "0"}</p>
                    </div>
                </div>
                {props.user && props.userDetail 
                    ?
                        <>
                            {props.userDetail._id !== props.user._id
                            ?
                                <>
                                    {props.userDetail.subscriber.indexOf(props.user._id) != -1
                                        ?
                                        <div className="log">
                                                <h3 onClick={() => handleUnsubscribe(props.userDetail._id)}>Unsubscribe</h3>
                                        </div>
                                        :
                                        <div className="log" onClick={() => handleSubscribe(props.userDetail._id)}>
                                                <h3>Subscribe</h3>
                                        </div>
                                    }
                                </>
                            :
                                <div className="log" onClick={() => props.setSetting(true)}>
                                    <h3>Lihat Profile</h3>
                                </div>
                            }
                        </>
                    : ""
                }
            </div>
            <div className="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => props.setViewAuthor(false)}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            </div>
        </div>
    )
}

export default ViewAuthor;