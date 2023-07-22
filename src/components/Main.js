import "../style/main.css"
import Posts from "./Posts"
import DetailPost from "./DetailPost"
import AddPost from "./AddPost"

const Main = (props) => {

    return (
        <div className={props.detail.bool ? "UpMain" : "Main"}>
            {props.addPost && !props.detail.bool
                ?
                    <AddPost user={props.user} setLoad={props.setLoad} viewer={props.viewer} setViewer={props.setViewer} addPost={props.addPost} setAlert={props.setAlert} setAddPost={props.setAddPost}/>
                :
                    ""
            }
            {props.detail.bool && !props.addPost
                ?
                    <DetailPost user={props.user} browser={props.browser} kategorikPosts={props.kategorikPosts} setLoad={props.setLoad} setAlert={props.setAlert} postsDetail={props.postsDetail} setPostsDetail={props.setPostsDetail} viewer={props.viewer} setViewer={props.setViewer} setLogin={props.setLogin} posts={props.detail.post} handleDetail={props.handleDetail}/>
                :
                    ""
            }
            {!props.detail.bool && !props.addPost
                ?
                    <Posts user={props.user} browser={props.browser} setLoad={props.setLoad} setLogin={props.setLogin} setAlert={props.setAlert} setUser={props.setUser} socket={props.socket} setSetting={props.setSetting} kategori={props.kategori} setAddPost={props.setAddPost} handleDetail={props.handleDetail}/>
                :
                    ""
            }
        </div>
    )
    
}

export default Main;