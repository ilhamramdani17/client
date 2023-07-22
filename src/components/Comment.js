import axios from "axios";
import "../style/comment.css";
import React, {useState} from "react";

const Comment = (props) => {

    const [comment,setComment] = useState('')

    const handleAddComment = async () => {
        props.setLoad(true)
        let data = {
            userid : props.user._id,
            authorid: props.userid,
            username: props.user.username,
            postid : props.postid,
            comment : comment
        }
       const add = await axios.post("http://localhost:8000/addComment",{data,to: props.userid,from: props.user._id,username: props.user.username})
       if (add.data.status === "success") {
           setComment('')
           props.setLoad(false)
           props.setAlert({
            "bool": true,
            "status": "success",
            "msg": "Comment Berhasil"
        })
           props.setPostsDetail(add.data.payload)
       }
    }

    return (
        <div className="commentContainer">
            {props.comments.length > 0
                ?
                <div className="display">
                    {props.comments.map((comment) => (
                        <div className="Comment">
                            <div className="bungkus">
                                <div className="headComment">
                                    <div>
                                    <button onClick={() => props.handleProfile(comment.userid)}>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                </svg>
                                            </span>
                                    </button>
                                    <strong onClick={() => props.handleProfile(comment.userid)}>{comment.username}</strong>
                                    </div>
                                </div>
                                <div className="bodyComment">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                ""
            }   
            {props.user
            ?
            <div className="comment">
                <input value={comment} type="text" placeholder="komentari..." onChange={(e) => setComment(e.target.value)}/>
                <button onClick={() => handleAddComment() }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                    </svg>
                </button>
            </div>
            :
            ""
            }
        </div>
    )
}

export default Comment;