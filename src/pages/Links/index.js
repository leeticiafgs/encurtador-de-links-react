import { useState, useEffect } from 'react';
import './links.css';
import { FiArrowLeft, FiLink, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';

import { getLinksSave, deleteLink} from '../../services/storelinks'
import LinkItem from '../../components/LinkItem'



function Links() {

  // USE STATE - criado para armazenar array de links ja encurtados

  const [myLinks, setMyLinks] = useState([]);
  const [data, setData] = useState({}); // armazena o item que a gente clicou
  const [showModal, setShowModal] = useState(false); 
  const [emptyList, setEmptList] = useState(false); 
  

  //USE EFFECT - cria o ciclo de vida
  useEffect(() => {
    async function getLinks(){
        const result = await getLinksSave('@encurtaLink');

        if(result.length ===0){
          setEmptList(true);
        }

        setMyLinks(result);
    }
    getLinks();
  },[]);

    // funcao que abre o modal quando clicar no link

    function handleOpenLink(link){
      setData(link);
      setShowModal(true);
    }

    // funcao que deleta link

    async function handleDelete(id){

     const result = await deleteLink(myLinks, id);

     if (result.length===0){
      setEmptList(true);
     }

     setMyLinks(result);
    }



    return (
      <div className='links-container'>
        <div className='links-header'>
          <Link to="/">
            <FiArrowLeft size={38} color="#FFF"/>
          </Link>          
          <h1>Meus Links</h1>
        </div>

        {/** CHAMA MODAL QUANDO A LISTA DE LINKS ESTA VAZIA */}

        {emptyList && (
          <div className="links-item">
            <h2 className='empty-text'>Você ainda não possui links...</h2>

          </div>
        )}


         {/** RENDERIZA A LISTA DE LINKS QUE ESTA NO STORAGE */}
        
        {myLinks.map (link => (
          <div key={link.id} className='links-item'>
            <button className='link' onClick={() => handleOpenLink(link)}>
              <FiLink size={18} color="#FFF"/>
              {link.long_url}
            </button>
            <button className="link-delete" onClick={() => handleDelete(link.id)}>
              <FiTrash size={24} color="#ff5454"/>
            </button>
          </div>
        ))}

        {/** CHAMADA DO MODAL */}

          {showModal && (
            <LinkItem
              closeModal={() => setShowModal(false)}
              content={data}/>
          )}

      </div>
    );
  }
  
  export default Links;
  