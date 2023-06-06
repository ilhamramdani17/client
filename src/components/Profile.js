import "../style/profile.css";
import "../style/main.css"
import axios from "axios";
import swal from "sweetalert"
import Comment from "./Comment.js";
import React, {useEffect,useRef, useState} from "react";

const Profile = (props) => {

    const [user,setUser] = useState(props.realUser)
    const [id,setId] = useState('')
    const [edit,setEdit] = useState(false)
    const [comment,setComment] = useState('')
    const [showComment,setShowComment] = useState(false)
    const [likeList,setLikeList] = useState('')
    const [counter, setCounter] = useState(0);
    const [file,setFile] = useState("")
    const [review,setReview] = useState("")
    const [preview,setPreview] = useState("")
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [describ,setDescrib] = useState('')
    const intervalRef = useRef(null);
    
    useEffect(() => {
            return () => stopCounter();
    },[])
    
    function handleImage (e) {
        const file = e.target.files[0]
        setFile(file)
        setReview(URL.createObjectURL(file))
        setPreview(file.name)
    }

    function handleShowComment (id,data) {
        setComment(data)
        if (showComment == id) {
            setShowComment('')
        } else {
            setShowComment(id)
        }
    }
    
    function startCounter () {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 10);
    }
    const stopCounter = async (id,like) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (counter > 40) {
            setId(id);
            const result = await axios.post("http://localhost:8000/getLike",like)
            setLikeList(result.data);
            setCounter(0);
        }else {
            let data = {
                postId: id,
                userId: props.user._id
            }
            await axios.post("http://localhost:8000/like",data)
        }
    }

    const handleUpdateProfile = async () => {
        props.setLoading(true)
        if (file) {
            if (file.type == "video/mp4" || file.type == "image/jpeg" || file.type == "image/png") {
                if (file.size < 1523141) {
                    var formData = new FormData()
            
                    formData.append("userid",user._id)
                    if (username) {
                        formData.append("username",username)
                    } else {
                        formData.append("username",user.username)
                    }
                    if (email) {
                        formData.append("email",email)
                    } else {
                        formData.append("email",user.email)
                    }
                    if (describ) {
                        formData.append("describ",describ)
                    } else {
                        formData.append("describ",user.describ)
                    }
                    formData.append("file",file)
    
                    fetch("http://localhost:8000/update",{
                    method: "POST",
                    body: formData,
                    })
                    .then((res) => res.json()).then((data) => {
                        if (data.status == "success") {
                            props.setLoading(false)
                            props.handleBeranda()
                            swal({
                                title: data.mssg,
                                icon: data.status,
                                timer: 1000,
                                showConfirmButton: false
                            })
                        } else {
                            props.setLoading(false)
                            swal({
                                title: data.mssg,
                                icon: data.status,
                                timer: 1000,
                                showConfirmButton: false
                            })
                        }
                    })
                } else {
                    props.setLoading(false)
                    swal({
                        title: "ukuran file terlalu besar",
                        icon: "warning",
                        timer: 1000,
                        showConfirmButton: false
                    })
                }
            }else {
                props.setLoading(false)
                swal({
                    title: "format file tidak sesuai",
                    icon: "warning",
                    timer: 1000,
                    showConfirmButton: false
                })
            }
        } else {
            const add = await axios.post("http://localhost:8000/update", {
                    userid: user._id,
                    username: username,
                    email: email,
                    describ: describ
            })

            props.setLoading(false)
            props.handleBeranda();

            if (add.data.status == "sussess") {
                swal({
                    title: add.data.mssg,
                    icon: add.data.status,
                    timer: 1000,
                    showConfirmButton: false
                })
            } else {
                swal({
                    title: add.data.mssg,
                    icon: add.data.status,
                    timer: 1000,
                    showConfirmButton: false
                })
            }
        }
    }

    function handleHideData () {
        setId('')
        setCounter(0)
        setLikeList('')
    }

    return (
        <div className="Profile">
           <div className="headProfile">
            <div className="closeProfile">
                {edit
                ?
                    <h3 onClick={() => setEdit(!edit)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </h3>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => props.handleBeranda()}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                }
            </div>
                {edit
                ?
                    <div className="editProfile">
                        <div className="imgTerakhir">
                            <button className="btnProfile">
                                    {props.user.userimage && props.user.userimage !== "undefined"
                                    ?
                                        <>
                                        {review
                                        ?
                                        <img src={review}/>
                                        :
                                        <img src={props.user.userimage}/>
                                        }
                                        </>
                                    :
                                        <>
                                        {review
                                        ?
                                        <img src={review}/>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                        </svg>
                                        }
                                        </>
                                    }
                            </button>
                        </div>
                        <div className="updateBio">
                            <label>username :</label>
                            <input placeholder={username ? username : user.username} onChange={(e) => setUsername(e.target.value)}/>
                            <label>email :</label>
                            <input type="email" placeholder={email ? email : user.email} onChange={(e) => setEmail(e.target.value)}/>
                            <label>Keterangan Akun :</label>
                            <textarea placeholder={describ ? describ : user.describ} onChange={(e) => setDescrib(e.target.value)}/>
                            <div className="updateImg">
                                <input type="file" id="file" name="file" onChange={(e) => handleImage(e)} />
                                <h3>{preview ? preview : "ubah profile..."}</h3>
                                <label htmlFor="file">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
                                        <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                        <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"/>
                                    </svg>
                                </label>
                            </div>
                            <button onClick={handleUpdateProfile}>Simpan</button>
                        </div>
                    </div>
                :
                    <>
                        <div className="image">
                            <button className="btnProfile">
                                    {props.user.userimage && props.user.userimage !== "undefined"
                                    ?
                                        <img src={props.user.userimage}/>
                                    :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                        </svg>
                                    }
                            </button>
                            {props.user._id === user._id
                                ?
                                    <button className="btnEdit" onClick={() => setEdit(!edit)}>Edit Profile</button>
                                :
                                    ""
                            }
                        </div>
                        <div className="textProfile">
                            <div className="bio">
                                <h2>{props.user.username}</h2>
                                {props.user._id !== user._id
                                    ?
                                        <button><strong>Ikuti</strong></button>
                                    :
                                        ""
                                }
                            </div>
                            <div className="describ">
                                <h3>{props.user.describ}</h3>
                            </div>
                            <div className="info">
                                <div className="posts">
                                    <h3>{props.posts.length}</h3>
                                    <h3>Posts</h3>
                                </div>
                                <div className="followed">
                                    <h3>{props.user.followed.length}</h3>
                                    <h3>Subscriber</h3>
                                </div>
                                <div className="following">
                                    <h3>{props.user.following.length}</h3>
                                    <h3>Subscribing</h3>       
                                </div>
                            </div>
                        </div>
                    </>
                }
           </div>
           <div className="bodyProfile">
                <h3>Posts</h3>
                <div className="content">
                        {props.posts.length > 0 && props.posts.map((post) => (
                            <div className="cardPost">
                                {post._id === id && likeList.length > 0
                                ?
                                    <div className="dataContainer">
                                        <div className="dataText">
                                            <h3>Likes :</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => handleHideData()}>
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>
                                        {likeList.map((item) => (
                                            <div className="cardData">
                                            <div className="head">
                                                        <button onClick={() => props.handleProfile(item._id)}>
                                                        {item.userimage && item.userimage !== "undefined"
                                                        ?
                                                            <img src={item.userimage}/>
                                                        :
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                                </svg>
                                                            </span>
                                                        }
                                                        </button>
                                                        <strong onClick={() => props.handleProfile(item._id)}>{item.username}</strong>
                                                        {item._id !== props.user._id
                                                        ?
                                                            <p>ikuti</p>
                                                        :
                                                            ""
                                                        }
                                                    </div> 
                                            </div>
                                        ))}
                                    </div>
                                :
                                    <div className="cardPost" key={post._id}>
                                        <div className="headPost">
                                                        <div className="head">
                                                            <button>
                                                            {post.userimage && post.userimage !== "undefined"
                                                            ?
                                                                <img src={post.userimage}/>
                                                            :
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                                    </svg>
                                                                </span>
                                                            }
                                                            </button>
                                                            <strong>{post.username}</strong>
                                                            {post.userid !== props.user._id
                                                            ?
                                                                <p>ikuti</p>
                                                            :
                                                                ""
                                                            }
                                                        </div>
                                                        <div className="create">
                                                        <p>{post.created_at}</p>
                                                        </div>
                                        </div>
                                        {post.file
                                            ?
                                            <>
                                                {post.file.split(".")[1] == "pdf"
                                                ?
                                                    <div className="assetPostDoc"  onClick={() => props.setDetailFile({"boll": true,"type": "pdf","review": post.file})}>
                                                        <img src="http://localhost:8000/icons/pdfThumbnile.png"/>
                                                        <h4>{post.filename}</h4>
                                                    </div>
                                                :
                                                    <div className="assetPostImg"  onClick={() => props.setDetailFile({"boll": true,"type": "image","review": post.file})}>
                                                        <img src={post.file}/>
                                                    </div>
                                                }
                                            </>
                                            :
                                                ""
                                        }
                                        <div className="description">
                                                        <p onClick={() => props.handleDetail(post,props.posts)}>{post.isi}</p>
                                        </div>
                                        <div className="action">
                                                <div className="response">
                                                {post.likes.length > 0
                                                ?
                                                    <>
                                                        {post.likes.indexOf(user._id) !== -1
                                                            ?
                                                            <>
                                                                <button className="liked"  
                                                                onMouseDown={startCounter}
                                                                onMouseUp={() => stopCounter(post._id,post.likes)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                                </svg>
                                                                </button>
                                                                {post.likes.length > 0
                                                                    ? <p>{post.likes.length}</p>
                                                                    : ""
                                                                }
                                                            </>
                                                            : 
                                                            <>
                                                                <button 
                                                                onMouseDown={startCounter}
                                                                onMouseUp={() => stopCounter(post._id,post.likes)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                                </svg>
                                                                </button>
                                                                {post.likes.length > 0
                                                                    ? <p>{post.likes.length}</p>
                                                                    : ""
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                :
                                                <>
                                                <button
                                                onMouseDown={startCounter}
                                                onMouseUp={() => stopCounter(post._id,post.likes)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                </svg>
                                                </button>
                                                {post.likes.length > 0
                                                    ? <p>{post.likes.length}</p>
                                                    : ""
                                                }
                                                </>
                                                }
                                                <button onClick={() => handleShowComment(post._id,post.comments)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                                                    </svg>
                                                </button>
                                                {post.comments.length > 0
                                                    ? <p>{post.comments.length}</p>
                                                    : ""
                                                }
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                                    </svg>
                                                </button>
                                                </div>
                                                {post._id === showComment
                                                    ?
                                                        <Comment 
                                                            user={user}
                                                            postid={post._id}
                                                            comments={comment}
                                                            handleProfile={props.handleProfile}
                                                        />
                                                    :
                                                        ""
                                                }
                                </div>
                                    </div>
                                }
                            </div>
                        ))}
                </div>
           </div>
        </div>
    )
}

export default Profile;