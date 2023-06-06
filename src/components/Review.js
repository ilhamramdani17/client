import "../style/review.css";
import axios from "axios";
import { io } from "socket.io-client";
import FileViewer from "react-file-viewer";
const socket = io.connect("http://localhost:8000")

const Review = (props) => {

    let type = props.review.split(".")
    type = type[type.length - 1]
    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    async function handleAddView (data) {
        const result = await axios.post("http://localhost:8000/addView",{postid: data.postid,userid: data.userid});
        props.setPostsDetail(result.data)
        socket.emit("addview",{
            "_id": makeid(8),
            "to": props.userid,
            "from": props.user._id,
            "postid": props.postid,
            "username": props.user.username
        })
    }

    return(
        <div className="Review">
            <div className="close" onClick={() => handleAddView({"postid": props.postid,"userid": props.user._id,"username": props.user.username})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => props.setViewer(false)}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            {type == "docx"
            ?
                <div className="viewDoc" style={{height: '94%',
                                                  padding: '4px'}}>
                        <FileViewer 
                        fileType = "docx"
                        filePath = {props.review}/>   
                </div>
            :
            <div className="viewBody" style={{height: '94%',
                                              padding: '4px'}}>
                <embed src={props.review + "#" + "toolbar=0"} width='100%' height='100%'/>
            </div>
            }
        </div>
    )
}

export default Review;