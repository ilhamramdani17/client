import axios from "axios";
import "../style/posts.css"
import ViewAuthor from "./ViewAuthor";
import { useEffect, useState } from "react";

const Posts = (props) => {

    const [id,setId] = useState('')
    const [posts,setPosts] = useState([])
    const [userDetail,setUser] = useState('')
    const [viewAuthor,setViewAuthor] = useState(false)
    
    useEffect(() => {
        if (props.kategori && props.kategori !== 'beranda' && props.kategori !== 'populer') {
            axios.post("http://localhost:8000/getPostByKategori",{kategori: props.kategori,user: props.user})
            .then((result) => {
                setPosts(result.data);
            })
        }else if(props.kategori && props.kategori == 'populer') {
            let data = []
            axios.post("http://localhost:8000/getPost", {user: props.user})
            .then((result) => {
                data = result.data.sort((i,j) => {return j.views.length - i.views.length || j.comments.length - i.comments.length || j.shares.length - i.shares.length})
                setPosts(data)
            })
        } else {
            axios.post("http://localhost:8000/getPost",{user: props.user})
            .then((result) => {
                setPosts(result.data);;
            })
        }
    },[posts])
    
        function handleViewAuthor (id) {
            setId(id)
            setViewAuthor(true)
            axios.post("http://localhost:8000/getUser",{data: id})
            .then((result) => {
                setUser(result.data[0])
            })
        }

    return (
        <div className="Posts">
            {posts.map((post) => (
                <div className={
                    post.file.split(".") [1] == "pdf" ? 'card-post-pdf': '' || 
                    post.file.split(".") [1] == "docx" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "doc" ? 'card-post-docx': '' || 
                    post.file.split(".") [1] == "jpg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "jpeg" ? 'card-post-img': '' || 
                    post.file.split(".") [1] == "png" ? 'card-post-img': ''} 
                    key={post._id}>
                    <div className="ujang">
                    <div className="post-file" onClick={() => props.handleDetail(true,post)}>
                        {post.file.split(".")[1] == "pdf"
                            ?
                            <div className="revFile">
                                <img src="http://localhost:3000/pdfIcon.png"/>
                            </div>
                            : ""
                        }
                        {post.file.split(".")[1] == "doc"
                            ?
                            <div className="revFile">
                                <img src="http://localhost:3000/docIcon.png"/>
                            </div>
                            : ""
                        }
                        {post.file.split(".")[1] == "docx"
                            ?
                            <div className="revFile">
                                <img src="http://localhost:3000/docxIcon.png"/>
                            </div>
                            : ""
                        }
                        {post.file.split(".")[1] == "jpg" || post.file.split(".")[1] == "jpeg" || post.file.split(".")[1] == "png"
                            ?
                            <div className="revImg">
                                <img src="http://localhost:3000/imageIcon.png"/>
                            </div>
                            : ""
                        }
                    </div>
                    <div className="post-des"  onClick={() => props.handleDetail(true,post)}>
                         <p>ket    :{post.isi}</p>
                         <p>ukuran :{post.size}</p>
                         <p>waktu  :{post.created_at}</p>
                    </div>
                    <div className="action">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" onClick={() => handleViewAuthor(post.userid)} onMouseEnter={() => handleViewAuthor(post.userid)}>
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </div>
                    </div>
                    <div className="response" onClick={() => props.handleDetail(true,post)}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                            <small className="hide">views</small>
                            <small>{post.views.length > 0 ? post.views.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            <small className="hide">comments</small>
                            <small>{post.comments.length > 0 ? post.comments.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                            <small className="hide">shares</small>
                            <small>{post.shares.length > 0 ? post.shares.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <small className="hide">downloads</small>
                            <small>{post.downloads.length > 0 ? post.downloads.length : ""}</small>
                        </div>
                    </div>
                    {viewAuthor
                        ? <ViewAuthor id={id} user={props.user} socket={props.socket} setSetting={props.setSetting} userDetail={userDetail} setUserDetail={setUser} setUser={props.setUser} posts={posts} setViewAuthor={setViewAuthor}/>
                        : ""
                    }
                </div>
            ))}
        </div>
    )
}

export default Posts;