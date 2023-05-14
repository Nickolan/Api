import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailStyle from './Detail.module.css';



export default function Detail(){
    let { id } = useParams();
    const [dogDetail, setDogDetail] = useState([]);
    const navigate = useNavigate();
    const myDetail = async () => {
        const dogDet = await axios.get('/dogs/' + id);
        setDogDetail(dogDet.data);
      }
    useEffect(() => {
        myDetail();
    }, [])

    const handleBack = () => {
        navigate('/home')
    }

    if (typeof dogDetail.temperaments === 'object') {
        let temperaments = dogDetail.temperaments.map(temp => {
            return ` ${temp.name}`
        })
        dogDetail.temperaments = temperaments.toString()
    }
    
    return (
        <div className={DetailStyle.contain}>
            <div className={DetailStyle.head}>
                <button onClick={handleBack} className={DetailStyle.button}>Back</button>
                <h4>DOG: N°{dogDetail.id}</h4>
            </div>
            <div className={DetailStyle.divDet}>
                <div>
                    <img className={DetailStyle.img} src={dogDetail.image} alt={dogDetail.name} />
                </div>

            <div className={DetailStyle.details}>
                <h2>Race: {dogDetail.name}</h2>
                <h2>Heigh: ({dogDetail.height})cm</h2>
                <h2>Weight: ({dogDetail.weight})kg </h2>
                <h2>Temperament/s: {dogDetail.temperaments}</h2>
                <h2>Life-Span: {dogDetail.life_span}</h2>
            </div>
            </div>
        </div>
    );
}
