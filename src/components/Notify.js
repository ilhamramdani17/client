import "../style/notify.css";
import axios from "axios";
import swal from "sweetalert";
import {useEffect, useState} from "react"

const Notify = (props) => {

    useEffect(() => {
        let data = []
        if (props.notifikasi) {
            props.notifikasi.map((notif) => {
                if (notif.status == "hide") {
                    data.push(notif._id) 
                }
            })
        }
        axios.post("http://localhost:8000/updateNotif",{data})
    },[])
  
  const handleClick = async (id,mssg) => {
    let identi = mssg.split(" ")
    if (identi.indexOf("mensubscribe") > 0 || identi.indexOf("menunsubscribe") > 0) {
        props.handleSetting()
    }else {
        const post = await axios.post("http://localhost:8000/getPostById",{_id: id})
        props.handleDetail(true,post.data[0])
    }
  }

  async function handleHapusSemua (id) {
    swal({
        title: "Apakah Kamu Yakin?",
        text: "Menghapus Semua Pemberitahuan!",
        icon: "warning",
        buttons: [
          'Tidak, Batalkan!',
          'Ya, Yakin'
        ],
        dangerMode: true,
      }).then(async function(isConfirm) {
        if (isConfirm) {
          props.setLoad(true)
          let data = await axios.post("http://localhost:8000/deleteAll",{id: id})
          if (data.data == "success") {
            props.setLoad(false)
            props.setAlert({
                "bool": true,
                "status": "success",
                "msg": "Berhasil Dihapus"
            })
        }else {
            props.setLoad(false)
            props.setAlert({
                "bool": true,
                "status": "error",
                "msg": "Gagal Dihapus"
            })
          }
        } else {
          swal("Cancelled", "Proses Dibatalkan", "error");
        }
      })
    }
    
    async function handleHapusItem (id) {
      swal({
          title: "Apakah Kamu Yakin?",
          text: "Menghapus Pemberitahuan Ini!",
          icon: "warning",
          buttons: [
            'Tidak, Batalkan!',
            'Ya, Yakin'
          ],
          dangerMode: true,
        }).then(async function(isConfirm) {
          if (isConfirm) {
            props.setLoad(true)
            let data = await axios.post("http://localhost:8000/deleteItem",{id: id})
            if (data.data == "success") {
              props.setLoad(false)
              props.setAlert({
                  "bool": true,
                  "status": "success",
                  "msg": "Berhasil Dihapus"
              })
          }else {
              props.setLoad(false)
              props.setAlert({
                  "bool": true,
                  "status": "error",
                  "msg": "Gagal Dihapus"
              })
            }
          } else {
            swal("Cancelled", "Proses Dibatalkan", "error");
          }
        })
    
  }

    return (
        <div className="Notify" onMouseLeave={() => props.setNotif(false)}>
            <div className="headNot">
            <h3>Pemberitahuan</h3>
            {props.notifikasi.length > 0
                ?
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" onClick={() => handleHapusSemua(props.user._id)}>
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                </svg>
                : ""
            }
            </div>
            {props.notifikasi.length > 0
            ?
                <div className="displayNot">
                {props.notifikasi.map((item) => (
                    <div key={item._id} >
                        <small className="isi" onClick={() => handleClick(item.postid,item.mssg)}>{item.mssg}</small>
                        <small>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" onClick={() => handleHapusItem(item._id)}>
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                        </small>
                    </div>
                ))}
                </div>
            :
                <div className="displayNot">
                    <small>Tidak Ada Notifikasi !</small>
                </div>
            }
        </div>
    )
}

export default Notify;