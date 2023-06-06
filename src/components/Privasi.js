import "../style/privasi.css";

const Privasi = (props) => {
    return (
        <div className="Privasi">
            <div className="privasi">
                <p>Privasi :</p>
                <select name="privasi" onChange={(e) => props.setPrivasiValue(e.target.value)}>
                    <option value="semua">Semua</option>
                    <option value="pengikut">Subscriber</option>
                    <option value="saya">Hanya Saya</option>
                </select>
             </div>
        </div>
    )
}

export default Privasi;