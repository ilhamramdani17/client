import "../style/review.css";
import axios from "axios";
import {useEffect, useState} from "react"

const Review = (props) => {

    const [time,setTime] = useState(0)

    useEffect(() => {
        setTimeout(async() => {
            if (time == 0) {
                const result = await axios.post("http://localhost:8000/addView",{to: props.userid,postid: props.postid,from: props.user._id,username: props.user.username});
                props.setPostsDetail(result.data)
                setTime(time + 1)
            }
        },10000)
    },[])

    let type = props.review.split(".")
    type = type[type.length - 1]

    return(
        <div className="Review">
            <div className="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => props.setViewer(false)}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <div className={props.browser == "Firefox" ? "viewBodyUnix" : "viewBody"} style={{height: '94%',
                                              padding: '4px'}}>
                <embed src={props.review + "#" + "toolbar=0"} width='100%' height='100%'/>
            </div>
        </div>
    )
}

export default Review;