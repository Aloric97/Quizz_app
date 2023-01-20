
import React from 'react';
import {useState} from 'react'
import {Link,useSearchParams,useNavigate} from 'react-router-dom'

//importing css
import './Game.css'

//importing 
import useFetch from '../hooks/useFetch';


export const Game=()=>{
    const { data, loading, error } = useFetch(`http://127.0.0.1:4000/category/findAllsCategory`, 'GET')



    if (error) return <p className='error-load'><h1>ups,the server have problems to load page</h1></p>;
    return( 
        <div className="container-game">
            {console.log(data)}
            <h2>Select any category</h2>
            {loading ? ( "loading") : ( 
                <div className="loading-game">
                {data.map((categoria,index) => (
                <div className="two-element" key={index} >
                <Link to={`/Game/${categoria.nombre}`}>
                    <button  className='btn btn-primary btn-submit' value={categoria.nombre}>{categoria.nombre}</button>
                </Link>
                </div>
                )) }
            </div>
            )}
        </div>
    )
}


