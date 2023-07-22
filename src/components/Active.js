import { useState } from "react"
import "../style/active.css"
import axios from "axios"

const Active = (props) => {

    const [code,setCode] = useState('')

    async function activeAkun () {
        props.setLoad(true)
       const result = await axios.post("http://localhost:8000/actived",{code: code})
       if (result.status == "success") {
        props.setAlert({
            "bool": true,
            "status": result.data.status,
            "msg": result.data.mssg
        }) 
        props.setActive(false)
        props.setLoad(false)
       }else {
        props.setAlert({
            "bool": true,
            "status": result.data.status,
            "msg": result.data.mssg
        }) 
        props.setActive(false)
        props.setLoad(false)
       }
    }

    return (
        <div className="active">
            <h3>Aktivasi Akun</h3>
            <div className="input">
            <input onChange={(e) => setCode(code + e.target.value)} required/>
            </div>
            <button onClick={() => activeAkun()}>Aktivasi</button>
        </div>
    )
}

export default Active;