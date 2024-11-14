import React from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useParams } from "react-router-dom"
import contacts from "./Mensajes_List/contacts"


const ChatsList = () => {
    const {userChatID} = useParams()

    const userFound = contacts.find(
        (contacto) => {
            return contacto.id === userChatID
    })
    
    console.log('userChatID: ', userChatID)
    console.log('userFound: ', userFound)
    console.log("contacts: ", contacts)
    
    return(
        <div>
            <Chats />
        </div>
    )
}


const Chats = ({ avatar, nombre, ultMensj, mensajes, hora, statusMsj }) => {
    let mensj = statusMsj === 'false'
    return (
        <div className="container-msj">
            <div className="cont-photo">
                <img src={avatar} alt={nombre} />
            </div>
            <div className="cont-name">
                <span className="name">{nombre}</span>
                <span className="ult-msj">{ultMensj}</span>
            </div>
            <div className="cont-hora-msj">
                <span className={`${mensj ? 'hora-false' : 'hora'}`}>{hora}</span>
                <span className={`${mensj ? 'no-msj' : 'msj'}`}>{mensajes}</span>
            </div>
            <div className="cont-flecha">
                <IoIosArrowDown className="flecha-msj" />
            </div>
        </div>
    )
}

export default ChatsList