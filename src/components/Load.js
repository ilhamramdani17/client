import "../style/alert.css"

const Load = (props) => {

    return (
        <div className="alert">
            <div className="success">
                <img src="http://localhost:3000/loader.gif"/>
                <h3>Loading...</h3>
            </div>
        </div>
    )
}

export default Load;