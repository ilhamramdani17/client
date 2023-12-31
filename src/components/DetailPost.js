import "../style/detailPost.css";
import axios from "axios";
import Share from "./Share"
import Review from "./Review"
import Comment from "./Comment"
import { useState } from "react";

const DetailPost = (props) => {

    const [share,setShare] = useState(false)
    const [display,setDisplay] = useState("comments")

    async function handleViewerView (data) {
        props.setViewer({"bool": data.bool,"type": data.type})
    }

    function handleShare (id) {
       setDisplay("shares")
       setShare({
        "bool": !share.bool,
        "id": id
       })
    }

    const onButtonClick = async (userid,id,data) => {
        props.setLoad(true)
        let dataname = data.split("/")
        fetch(data).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = dataname[dataname.length - 1]
                alink.click();
                axios.post("http://localhost:8000/addDownload",{id: id,to: userid,from:props.user._id,username: props.user.username,user: props.user._id})
                .then((result) => {
                    props.setLoad(false)
                    props.setPostsDetail(result.data)
                    props.setAlert({
                        "bool": true,
                        "status": "success",
                        "msg": "Download Berhasil"
                    })
                })
            })
        })
    }

    return (
        <div className="Detail-Post">
            {props.viewer.bool
                ?
                <Review user={props.user} browser={props.browser} userid={props.posts[0].userid} review={props.posts[0].file} postid={props.posts[0]._id} viewer={props.viewer}  setViewer={props.setViewer} setPostsDetail={props.setPostsDetail}/>
                :
                ""
            }
            {props.postsDetail.length > 0 
            ?
            <>
            {props.postsDetail.map((post) => (
                <div className={
                    post.file.split(".") [1] == "pdf" ? 'card-post-pdf': '' || 
                    post.file.split(".") [1] == "docx" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "doc" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "jpg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "jpeg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "png" ? 'card-post-img': ''} 
                    key={post._id}>
                    <div>
                        <div className="post-file">
                            <div className={props.browser == "Firefox" ? "revFileUnix" : "revFile"}>
                                <embed src={post.file + "#" + "toolbar=0"} />
                            </div>
                    </div>
                    <div className="card-profile">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg> 
                        </button>
                        <p>{post.username}</p>
                    </div>
                    <div className="post-des">
                        <div className="sekat1">
                        <p>name   : {post.filename}</p>
                        <p>ukuran : {post.size}</p>
                        <p>waktu  : {post.created_at}</p>
                        <p>ket    : {post.isi}</p>
                        </div>
                        <div className="sekat2">
                        {props.user
                            ?
                                <div className="action">
                                    {post.file.split(".")[1] !== "pdf"
                                        ?
                                        <div>
                                            <div onClick={() => onButtonClick(post.userid,post._id,post.file)}>
                                                <small className="hide">downloads</small>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                </svg>
                                            </div>
                                                <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => handleViewerView({"bool": true,"type": "image"})}>
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                        </div>
                                    :
                                            <div>
                                            <div onClick={() => onButtonClick(post.userid,post._id,post.file)}>
                                                <small className="hide">downloads</small>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                </svg>
                                            </div>
                                                <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => handleViewerView({"bool": true,"type": "pdf"})}>
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                        </div>
                                    }
                                </div>
                            :
                                <div className="action">
                                    <div className="loginButton" onClick={() => props.setLogin(true)}>
                                    <small className="hide">downloads</small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    </div>
                                    <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => props.setLogin(true)}>
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                </div>
                        }
                        </div>
                    </div>
                    </div>
                    <div className="response">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                            <p>views</p>
                            <small>{post.views.length > 0 ? post.views.length : ""}</small>
                        </div>
                        <div onClick={() => setDisplay("comments")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            <p>comments</p>
                            <small>{post.comments.length > 0 ? post.comments.length : ""}</small>
                        </div>
                        <div onClick={() => handleShare(post._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                            <p>shares</p>
                            <small>{post.shares.length > 0 ? post.shares.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <p>downloads</p>
                            <small>{post.downloads.length > 0 ? post.downloads.length : ""}</small>
                        </div>
                    </div>
                    {share.bool && props.user
                        ?
                        <Share share={share} user={props.user} setLoad={props.setLoad} setAlert={props.setAlert} postid={post._id} setPostsDetail={props.setPostsDetail}/>
                        :   ""
                    }
                    {display == "comments"
                    ?
                        <Comment user={props.user} setLoad={props.setLoad} userid={post.userid} setAlert={props.setAlert} setPostsDetail={props.setPostsDetail} postid={post._id} comments={post.comments}/>
                    :   ""
                    }
                </div>
            ))}
            </>
            :
            <>
            {props.posts.map((post) => (
                <div className={
                    post.file.split(".") [1] == "pdf" ? 'card-post-pdf': '' || 
                    post.file.split(".") [1] == "docx" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "doc" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "jpg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "jpeg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "png" ? 'card-post-img': ''} 
                    key={post._id}>
                    <div>
                    <div className="post-file">
                            <div className={props.browser == "Firefox" ? "revFileUnix" : "revFile"}>
                                <embed src={post.file + "#" + "toolbar=0"} width='100%' height='100%' />
                            </div>
                    </div>
                    <div className="card-profile">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg> 
                        </button>
                        <p>{post.username}</p>
                    </div>
                    <div className="post-des">
                        <div className="sekat1">
                        <p>name   : {post.filename}</p>
                        <p>ukuran : {post.size}</p>
                        <p>waktu  : {post.created_at}</p>
                        <p>ket    : {post.isi}</p>
                        </div>
                        <div className="sekat2">
                        {props.user
                            ?
                                <div className="action">
                                    {post.file.split(".")[1] !== "pdf"
                                        ?
                                        <div>
                                            <div onClick={() => onButtonClick(post.userid,post._id,post.file)}>
                                                <small className="hide">downloads</small>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                </svg>
                                            </div>
                                                <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => handleViewerView({"bool": true,"type": "image"})}>
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                        </div>
                                    :
                                            <div>
                                            <div onClick={() => onButtonClick(post.userid,post._id,post.file)}>
                                                <small className="hide">downloads</small>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                </svg>
                                            </div>
                                                <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => handleViewerView({"bool": true,"type": "pdf"})}>
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                        </div>
                                    }
                                </div>
                            :
                                <div className="action">
                                    <div className="loginButton" onClick={() => props.setLogin(true)}>
                                    <small className="hide">downloads</small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    </div>
                                    <svg className="log" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => props.setLogin(true)}>
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                </div>
                        }
                        </div>
                    </div>
                    </div>
                    <div className="response">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                            <p>views</p>
                            <small>{post.views.length > 0 ? post.views.length : ""}</small>
                        </div>
                        <div onClick={() => setDisplay("comments")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            <p>comments</p>
                            <small>{post.comments.length > 0 ? post.comments.length : ""}</small>
                        </div>
                        <div onClick={() => handleShare(post._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                            <p>shares</p>
                            <small>{post.shares.length > 0 ? post.shares.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <p>downloads</p>
                            <small>{post.downloads.length > 0 ? post.downloads.length : ""}</small>
                        </div>
                    </div>
                    {share.bool && props.user
                        ?
                            <Share share={share} user={props.user} setLoad={props.setLoad} setAlert={props.setAlert} userid={post.userid
                            } postid={post._id} setPostsDetail={props.setPostsDetail}/>
                        :   ""
                    }
                    {display == "comments"
                    ?
                        <Comment user={props.user} setLoad={props.setLoad} setAlert={props.setAlert} userid={post.userid} setPostsDetail={props.setPostsDetail} postid={post._id} comments={post.comments}/>
                    :   ""
                    }
                </div>
            ))}
            </>
            }
            <div className="relateContainer">
                <div className="text">
                    <h3>Document Serupa :</h3>
                </div>
                <div className="relatePosts">
                    {props.kategorikPosts.map((post) => (
                            <div className={
                                post.file.split(".") [1] == "pdf" ? 'card-post-pdf': '' || 
                                post.file.split(".") [1] == "docx" ? 'card-post-docx': '' || 
                                post.file.split(".") [1] == "doc" ? 'card-post-docx': '' || 
                                post.file.split(".") [1] == "jpg" ? 'card-post-img': '' || 
                                post.file.split(".") [1] == "jpeg" ? 'card-post-img': '' || 
                                post.file.split(".") [1] == "png" ? 'card-post-img': ''} 
                                key={post._id} onClick={() => props.handleDetail(true,post)}>
                                <div>
                                    <div className="post-file">
                                        <div className={props.browser == "Firefox" ? "revFileUnix" : "revFile"}>
                                            <embed src={post.file + "#" + "toolbar=0"} width='100%' height='100%' />
                                        </div>
                                </div>
                                <div className="card-profile">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                        </svg> 
                                    </button>
                                    <p>{post.username}</p>
                                </div>
                                <div className="post-des">
                                    <p>ukuran : {post.size}</p>
                                    <p>waktu  : {post.created_at}</p>
                                    <p>ket    : {post.isi}</p>
                                </div>
                                </div>
                                <div className="response">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                        </svg>
                                        <p>views</p>
                                        <small>{post.views.length > 0 ? post.views.length : ""}</small>
                                    </div>
                                    <div onClick={() => setDisplay("comments")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                        <p>comments</p>
                                        <small>{post.comments.length > 0 ? post.comments.length : ""}</small>
                                    </div>
                                    <div onClick={() => handleShare(post._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                        </svg>
                                        <p>shares</p>
                                        <small>{post.shares.length > 0 ? post.shares.length : ""}</small>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                        <p>downloads</p>
                                        <small>{post.downloads.length > 0 ? post.downloads.length : ""}</small>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailPost;