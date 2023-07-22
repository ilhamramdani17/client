import axios from "axios"
import "../style/share.css"
import {FacebookIcon,TelegramIcon,WhatsappIcon,TwitterIcon} from "react-share"
import {FacebookShareButton,TelegramShareButton,WhatsappShareButton,TwitterShareButton} from "react-share"

const Share = (props) => {
    async function handleShareData (data) {
        props.setLoad(true)
        const result = await axios.post("http://localhost:8000/addShare",{data,to: props.userid,from: props.user._id,username: props.user.username})
        if (result) {
            props.setLoad(false)
            props.setPostsDetail(result.data)
            props.setAlert({
                "bool": true,
                "status": "success",
                "msg": "Share Berhasil"
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