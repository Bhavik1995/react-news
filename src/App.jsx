import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () =>{

    const [updates,setUpdates] = useState([])
    const [search, setSearchQuery] = useState('tesla');
    const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=tesla');

    const findNews = () =>{
        fetch(`https://hn.algolia.com/api/v1/search?query=${search}`)
        .then(result=>result.json())
       .then(data=>setUpdates(data.hits))
       .catch(err=> console.log(err));
    }

    useEffect(()=>{
        findNews()
    },[url])

    const makeChange = (e) =>{
        setSearchQuery(e.target.value);
    }

    const handleInput = (e) =>{
        e.preventDefault()
        setUrl(`https://hn.algolia.com/api/v1/search?query=${search}`)
    }
    return(
        <>
            <div>
                <h1>News APP</h1>
                <form onSubmit={handleInput}>
                    <input type="text" value={search} onChange={makeChange}/>
                    <button>Search News</button> 
                </form>
                {updates.map((n,i)=>(
                    <div className="content">
                         <p key={i}>{n.title}</p>
                    </div>
                ))}
            </div>
        </>
    )
    
    
}
export default App;