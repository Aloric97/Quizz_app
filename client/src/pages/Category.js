import React from 'react';

import  {useParams} from 'react-router-dom'
import useFetch from '../hooks/useFetch';


export const Category = ()=>{
    const {category}= useParams()
    let { data, loading, error } = useFetch(`http://127.0.0.1:4000/category/showCategory?categoria=${category}`,'GET')
    
    if (error) return <p className='error-load'><h1>ups,the server have problems to load page</h1></p>;
    return(
        <div className="category-game">
            {console.log(data)}
            
            <h1>Welcome to the category {category}</h1>
        </div>
    )


}