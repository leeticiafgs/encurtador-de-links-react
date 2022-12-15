import { useState } from "react";
import { FiLink } from "react-icons/fi";

import './home.css'

import Menu from "../../components/menu";
import LinkItem from "../../components/LinkItem";
import api from '../../services/api';
import {saveLink} from '../../services/storelinks'

function Home() {

  const [link, setLink] = useState('');
  const [showModal, setShowModal]= useState(false);
  const [data, setData] = useState({});

  async function handleShortLink(){
    
    try {

      const response=await api.post('/shorten', {
        long_url:link
      })

      setData(response.data);// pega os dados do item curto que veio na API
      setShowModal(true); //funcao que chama o modal, alterando o useStage para true
      saveLink('@encurtaLink', response.data);
      setLink('');
      
    } catch {
      alert("Ops, parece que algo deu errado!")
      setLink('')
    }
  }
  
    return (
      <div className="container-home">
        <div className="logo">
          <img src="/logo.png" alt="Link Logo"/>
          <h1>Encurtador de Links</h1>
          <span>Cole seu link para encurtar 👇 </span>
        </div>
        <div className="area-input">
          <div>
            <FiLink size={24} color="#fff"></FiLink>
            <input
              placeholder="Cole seu link aqui..."
              value={link}
              onChange={(e)=> setLink(e.target.value)}
              />
          </div>
          <button onClick={handleShortLink}>Gerar Link</button>
        </div>
      
      <Menu/>

      {/** RENDERIZAÇÃO DE CONDIÇÃO - Acessa o valor de showmodal. Esses && é uma condicao. So renderiza se ele estiver True*/}
      
      {showModal && (
        <LinkItem
          closeModal={() => setShowModal(false)}
          content={data}
        />
      )}

      </div>
    );
  }
  
  export default Home;
  