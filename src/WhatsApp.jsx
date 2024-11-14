import React, { useEffect, useRef, useState } from "react"
import './style.css'
import { MdChat, MdOutlineGroups } from "react-icons/md";
import { SiCircle } from "react-icons/si";
import { RiChatVoiceLine, RiChatFollowUpLine } from "react-icons/ri";
import { IoSettingsOutline, IoSearchOutline, IoSend,} from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckAll, BsFillCameraVideoFill } from "react-icons/bs";
import { PiClockCountdownBold, PiSmileyBold } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { FaMicrophone } from "react-icons/fa";
import getFormattedDateMMHHDDMM from "./helpers/getFormattedDate";
import ChatsList from "./Chats";


function WhatsApp() {
  return (
    <div className="padre">
      <aside className="aside-container">
        <div className="top-aside">
          <button className="caja-icon"><MdChat className="icon"/></button>
          <button className="caja-icon"><SiCircle className="icon"/></button>
          <button className="caja-icon"><RiChatVoiceLine className="icon"/></button>
          <button className="caja-icon"><MdOutlineGroups className="icon"/></button>
        </div>
        <div className="bottom-aside">
          <button className="caja-icon"><IoSettingsOutline className="icon"/></button>
          <button><img src="https://ca.slack-edge.com/T07EJ2FLZ2R-U07EQ1QMU4D-ee680d421008-48" alt="Foto Perfil" className="img-perfil"/></button>
        </div>
      </aside>
      <header className="header-container">
        <div className="container-top">
          <h2 className="title-text">Chats</h2>
          <div className="container-top-button">
            <button className="caja-icon"><RiChatFollowUpLine className="icon"/></button>
            <button className="caja-icon"><SlOptionsVertical className="icon-option"/></button>
          </div>
        </div>
        <div className="container-search">
          <IoSearchOutline />
          <span>Buscar</span>
        </div>
        <nav className="container-nav">
          <ul className="cont-ul">
            <li className="caja-li-b li-select">Todos</li>
            <li className="caja-li">No Leidos</li>
            <li className="caja-li">Favoritos</li>
            <li className="caja-li-b caja-g">Grupos</li>
          </ul>
        </nav>
        <ChatsList/>
      </header>
      <div className="fondo-chat">
        <div className="header-chat">
          <div>
          <ImgPerfil/>
          </div>
          <div className="contenedor-header-chat">
            <div className="top-left-chat">
              <BsFillCameraVideoFill className="icon-chat-top-left"/>
              <IoIosArrowDown className="icon-chat-top-flecha"/>
            </div>
            <IoSearchOutline className="icon-chat-top lupa"/>
            <SlOptionsVertical className="icon-chat-top"/>
          </div>
        </div>
        <TextArea/>
      </div>
    </div>
  )
}

const TextArea = () => {
    const [ocultarMicrofono, setOcultarMicrofono] = useState(false)

    const handleClickTextarea = () => {
      setOcultarMicrofono(true)
    }

    const handleClickFueraTextarea = () => {
      setOcultarMicrofono(false)
    }

    const [mensajes, setMensajes] = useState([])
    const handleSubmitUncontrolledForm = (evento) => {
        evento.preventDefault()
        const messageJSX = evento.target
        const nuevoMensaje ={
            mensaje: messageJSX.text.value,
            hora: getFormattedDateMMHHDDMM()
        }

        setMensajes([...mensajes, nuevoMensaje])
        messageJSX.reset()
    }

    return (
      <div>
        <div className="chat-teclado">
          <div className="teclado-cont-icon">
            <PiSmileyBold className="icon-teclado-smile" />
            <GoPlus className="icon-teclado-plus" />
            <div className="teclado">
              <form
                placeholder="Escribe un mensaje"
                className="input-teclado"
                onClick={handleClickTextarea}
                onSubmit={handleSubmitUncontrolledForm}
              >
                <label htmlFor="text"></label>
                <input type='text' id='text' name='text' placeholder='Escribe un mensajeon' />
              </form>
            </div>
            {!ocultarMicrofono && <FaMicrophone className="icon-teclado-micro" />}
            {ocultarMicrofono && <IoSend className="icon-teclado-send" onClick={handleClickFueraTextarea} />}
          </div>
        </div>
        <MensajeEnvList msm={mensajes} />
      </div>
    )
}

const MensajeEnvList = ({msm}) =>{

    const contenedorRef = useRef(null)

    useEffect(() => {
      if(contenedorRef.current){
        contenedorRef.current.scrollBottom = contenedorRef.current.scrollHeight
      }
    }, [msm])

  return(
      <div ref={contenedorRef} className="contenedor-msj">
          {msm.map(ms =>{
              return(
                  <NewMessage mensaje={ms.mensaje} hora={ms.hora}  />
              )
          })}
      </div>
  )
}

const NewMessage = ({mensaje, hora}) => {
  return(
      <div className="msjNewPosicion">
        <MessajeList texto={mensaje} hora={hora} emisor={'yo'} status={'no-visto'}/>
      </div>
  )
}

const MessajeList = ({hora, texto, status, emisor}) => {
  const visto = status === 'visto'
  const no_enviado = status === 'no_enviado'
  const msj = emisor === 'tu'

  return(
    <div className = "MensajeList">
      {msj ? 
        <div div className = "cont-Mensaje tu" >
          <div className="cont-txt-msj">
            <span className="texto">{emisor}:</span>
            <span className="Mensaje">{texto}</span>
          </div>
          <div className="cont-h-sts">
            <span className="texto">{hora}</span>
            {visto ? <span className="texto check check_visto"><BsCheckAll /></span>
              : no_enviado ? <span className="texto check-env"><PiClockCountdownBold /></span> : <span className="texto check"><BsCheckAll /></span>
            }
          </div>
        </div >
        :
        <div className="cont-Mensaje yo">
          <div className="cont-txt-msj">
            <span className="texto">{emisor}:</span>
            <span className="Mensaje">{texto}</span>
          </div>
          <div className="cont-h-sts">
            <span className="texto">{hora}</span>
            {visto ? <span className="texto check check_visto"><BsCheckAll /></span>
              : no_enviado ? <span className="texto check-env"><PiClockCountdownBold /></span> : <span className="texto check"><BsCheckAll /></span>
            }
          </div>
        </div>
      }
    </div > 
  )
}

const ImgPerfil = ({ avatar, nombre, emisor }) => {
  return (
      <div className="Nombre-perfil-Chat">
          <img src={avatar} className="chat-perfil-foto" />
          <div className="chat-perfil-text">
              <span className="chat-text-name">{nombre}</span>
              <span className="chat-text-emi">{emisor}</span>
          </div>
      </div>
  )
}
export default WhatsApp