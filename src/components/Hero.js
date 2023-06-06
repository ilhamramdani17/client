import "../style/hero.css"
import axios from "axios"
import {useState} from "react"
import Search from "./Search";

const Hero = (props) => {
    
    const [searchText,setSearchText] = useState('');
    const [searchResult,setSearchResult] = useState('');

    const handleSearchLive = async (e) => {
        if (e) {
            props.setLoad(true)
        }
        setSearchText(e)
        const data = await axios.post("http://localhost:8000/search",{searchText})
        if (!e || data) {
            props.setLoad(false)
        }
        setSearchResult(data.data)
    }

    return (
        <div className={props.viewer.bool !== true ? "Hero" : "heroHide"}>
            <div className="searchText">
                <h4>Telusuri Document :</h4>
            </div>
            <div className="searchInput">
                <input type="text" placeholder="Tulis Disini..." onChange={(e) => handleSearchLive(e.target.value)}/>
                <button onClick={() => handleSearchLive(searchText)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                </button>
            </div>
            {searchResult && searchText
                ?
                    < Search search={searchResult} handleDetail={props.handleDetail}/>
                :  
                    ""
            }
        </div>
    )
}

export default Hero;