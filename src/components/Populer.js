import "../style/populer.css"
import axios from "axios"
import { useState,useEffect } from "react"

const Populer = (props) => {

    const [posts,setPosts] = useState([])

    useEffect(() => {
        let data = []
        axios.post("http://localhost:8000/getPost", {user: props.user})
        .then((result) => {
            data = result.data.sort((i,j) => {return  j.downloads.length - i.downloads.length || j.views.length - i.views.length || j.comments.length - i.comments.length || j.shares.length - i.shares.length || j.downloads.length - i.downloads.length})
            setPosts(data)
        })
    },[posts])

    function handlePopuler () {
        props.setDetail(false)
        props.setAddPost(!props.addPost)
    }

    return (
        <div className={props.viewer.bool !== true ? "Populer" : "hidePopuler"}>
            {props.user
                ?
                    <button className="addpostButton" onClick={() => handlePopuler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                            <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </button>
                :
                    ""
            }
            <div className="populerText">
                <h2>Populer</h2>
            </div>
            <div className={props.user ? "populer-sign" : "populer-data"}>
                {posts.map((post) => (
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
                    <div className="post-deskripsi">
                         <p>ket    :{post.isi}</p>
                         <p>ukuran :{post.size}</p>
                         <p>waktu  :{post.created_at}</p>
                    </div>
                    </div>
                    <div className="response">
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Populer;