import axios from "axios"
import "../style/share.css"
import { io } from "socket.io-client"
import {FacebookIcon,TelegramIcon,WhatsappIcon,TwitterIcon} from "react-share"
import {FacebookShareButton,TelegramShareButton,WhatsappShareButton,TwitterShareButton} from "react-share"
const socket = io.connect("http://localhost:8000")

const Share = (props) => {

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async function handleShareData (data) {
        props.setLoad(true)
        const result = await axios.post("http://localhost:8000/addShare",{data})
        if (result) {
            props.setLoad(false)
            props.setPostsDetail(result.data)
            socket.emit("addshare",{
                "_id": makeid(8),
                "to": props.userid,
                "from": props.user._id,
                "postid": props.postid,
                "username": props.user.username
            })
        }
    }

    return (
        <div className="share">
            <FacebookShareButton
                hashtag="#sharing"
                quote="sharing ilmu"
                url= {"http://localhost:3000/id=" + props.share.id}
                onShareWindowClose={ () => handleShareData ({"userId": props.user._id,"postid": props.postid,"username": props.user.username,"to": "facebook"})}
            >
                <FacebookIcon size="32"round="true"></FacebookIcon>
            </FacebookShareButton>
            <TelegramShareButton
                title="sharing ilmu"
                url= {"http://localhost:3000/id=" + props.share.id}
                onShareWindowClose={ () => handleShareData ({"userId": props.user._id,"postid": props.postid,"username": props.user.username,"to": "telegram"})}
            >
                <TelegramIcon size="32"round="true"></TelegramIcon>
            </TelegramShareButton>
            <TwitterShareButton
                title="sharing ilmu"
                hashtag="berbagi document"
                url= {"http://localhost:3000/id=" + props.share.id}
                onShareWindowClose={ () => handleShareData ({"userId": props.user._id,"postid": props.postid,"username": props.user.username,"to": "twitter"})}
            >
                <TwitterIcon size="32"round="true"></TwitterIcon>
            </TwitterShareButton>
            <WhatsappShareButton
                title="Bagi ilmu :"
                url= {"http://localhost:3000/id=" + props.share.id}
                onShareWindowClose={ () => handleShareData ({"userId": props.user._id,"postid": props.postid,"username": props.user.username,"to": "whatsapp"})}
            >
                <WhatsappIcon size="32"round="true"></WhatsappIcon>
            </WhatsappShareButton>
        </div>
    )
}

export default Share;