import React from 'react'
import './Footer.css'
import Logo from '../assets/img/logo-f-store-2.png'


import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
        <div className="footer_content">
             
            <div className="footer_content-section">
                <p className="footer_section-title">Sobre nós</p>
                <p className="footer_section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt veniam eos cupiditate ipsa, praesentium possimus reprehenderit inventore repellat.</p>
            </div>

            <div className="footer_content-section">
                <p className="footer_section-title">Contato</p>
                <p className="footer_section-text"><span>mail:</span> suporte@fstore.com</p>
                <p className="footer_section-text"><span>WhatsApp:</span> 12 93456-7890</p>
            </div>

            <div className="footer_content-section">
                <p className="footer_section-title">Se conecte conosco</p>
                <p className="footer_section-text">Receba promoções, ofertas e novidades antes de todo mundo!</p>
            <form>
                <input type="text" placeholder='Seu email' />
                <button type='button'>Enviar</button>
            </form>
            </div>
        </div>
        <div className="footer_bottom">
            <div className="footer_bottom-icons">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
            <p>Todos os direitos reservados a &copy;FStore 2023</p>
        </div>
    </footer>
  )
}

export default Footer