import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function History(){
    const history=useSelector((state)=>state.words_array);
    return(
        <div>
            
            <div className="heading"><h1>Search History</h1></div>
            <div className="searched">
                <ul>
                {history.map((word,idx)=>(
                    <li key={idx}>{word}</li>
                ))}
                </ul>
            </div>
    
        </div>
    );
}

export default History;