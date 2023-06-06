import "../style/search.css";

const Search = (props) => {

    return (
        <div className="Search">
            {props.search.length > 0
            ?
            <>
            {props.search.length > 0 && props.search.map((post) => (
                <div className={post.file.split(".") [1] !== "pdf" ? 'card-post-img': 'card-post-pdf'} key={post._id} onClick={() => props.handleDetail(true,post)}>
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
                    <div className="response">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                            <small>{post.views.length > 0 ? post.views.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            <small>{post.comments.length > 0 ? post.comments.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                            <small>{post.shares.length > 0 ? post.shares.length : ""}</small>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <small>{post.downloads.length > 0 ? post.downloads.length : ""}</small>
                        </div>
                    </div>
                </div>
            ))}
            </>
            :
                <div className="not-found">
                    <p>Data Tidak Ditemukan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </div>
            }
        </div>
    )
}

export default Search;