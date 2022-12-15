import './menu.css'
import {BsLinkedin, BsGithub} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Menu(){
    return(
        <div className='menu'>
            <a className='social' href='https://www.linkedin.com/in/leeticiafgs/'>
                <BsLinkedin color='#FFF' size={24}/>
            </a>
            <a className='social' href='https://github.com/leeticiafgs'>
                <BsGithub color='#FFF' size={24}/>
            </a>
            <Link className="menu-item" to="/links">Meus links</Link>
            
        </div>
    )
}