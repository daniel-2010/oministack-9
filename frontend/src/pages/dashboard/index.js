import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'
import './styles.css';

export default function Dashboard(){
    const [spots, setSpots ] = useState([]);
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem("user");
            const response = await api.get("/dashboard",{
                headers:{
                    user_id
                }
            });
            setSpots(response.data)
        }
        loadSpots();
    }, []);
    async function handleDelete(spot){
        
        if(window.confirm(`Deseja realmente remover este item?`)){
            const response = await api.delete(`/spots/${spot._id}`);
            
            if(response.data.stat === 1){
                setSpots(spots.filter(el => el !== spot));
                alert(response.data.message);
            }else{
                alert(response.data.message);
            }
            
        }
    }
    return (
        <>
            <ul className="spot-list">

            {spots.map(spot =>(
                <li key={spot._id}>
                    <header style={{backgroundImage:`url(${spot.thumbnail_url})`}}>
                        <button onClick={() => handleDelete(spot)} className="btnDelete">X</button>
                    </header>
                    <strong>{spot.company}</strong>
                    <span>{spot.price? `R$${spot.price}/dia`:'Gratuito'}</span>
                </li>
            ))}
            </ul>
            <Link to="/new"><button className="btn">Cadastrar novo spot</button></Link>
        </>
    )
}