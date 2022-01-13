import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import{FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';



    export default function Profile(){
        const [incidents, setIncidents] = useState([]);

        const ongId = localStorage.getItem('ongId');
        const ongName = localStorage.getItem('ongName');
        const history = useHistory();


        if(ongName === null){
            alert("Realize o Login!");
            history.push('/')
        }


        useEffect(() => {
            api.get('profile', {
             headers:{
                Authorization: ongId,
             }   
            }).then(response => {
                setIncidents(response.data);
            })

        }, [ongId]);

        async function handleDeleteIncident(id){
            try {
                await api.delete(`incidents/${id}`,{
                    headers:{
                        Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident=> incident.id !== id));

        }catch(err){
              alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                  
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>DOAR COM PAYPAL:</strong>
                        
                        <form 
                        action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="N435SNY8VXDP8" />
                        <input type="image" src={logoImg} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
                        <img src={logoImg} width="1" height="1" />
                        </form>
                       
                        
                       

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}  
            </ul>
        </div>
    );
}