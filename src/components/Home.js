import React ,{useState }from "react";
import { useSelector, useDispatch } from "react-redux";
import { meaning } from "../redux/actions/action";
import { addHistory } from "../redux/actions/action";
import { failed_to_fetch } from "../redux/actions/action";
import axios from "axios";
function Home(){
    const data=useSelector(state=> state.words_array);
    const [loading,setLoading]=useState(false);
    const [wordmeaning,setWordmeaning]=useState([]);
    const [searchedWord,setSearchedWord]=useState("");
    //let wordmeaning=[];
    let newWord="";
    const dispatch = useDispatch()

    function displayMeaning(){
        setLoading(true);
        dispatch(addHistory(newWord));
        meaning(newWord)
        console.log(newWord);
       let history = JSON.parse(localStorage.getItem("history"));
            if(!history){
                history= [];
            }
            localStorage.setItem("history", JSON.stringify([...history,newWord]))
    }

    function word(e){
        newWord=e.target.value;
    }

    async function meaning(newword){
        setSearchedWord(newWord);
            try{
                const url="https://api.dictionaryapi.dev/api/v2/entries/en/"+newword;
            const means=await axios.get(url);
           
            setWordmeaning(means.data);
            setLoading(false);
            console.log(wordmeaning,means.data);
            // dispatch(addHistory(word))
            }
            catch(error){
                // dispatch(failed_to_fetch(error));
                setLoading(false);
                console.log("no results");
            }
        
    }

    const displayDefinitions=(meaningItem)=>{
        console.log(meaningItem);
        if (meaningItem.definitions && meaningItem.definitions.length > 0) {
            return meaningItem.definitions.map((definition, idx) => (
                <div key={idx}>
                    
                    
                    <div>{definition.definition}</div>
                    
                </div>
            ));
        } else {
            return <div>No definitions available.</div>;
        }
        
    }

    const displayPhonetics=(item)=>{
       console.log(item);
       if(item.audio){
        return(
            <div>
                <div>{item.text}</div>
                <audio src={item.audio} controls/>
            </div>
        )
       }
       else{
        return (<div>here{item.text}</div>)
       }
    }
    

    return(
        <div>
           
            <div className="search-container">
                <input type="text" placeholder="Search" onChange={(e)=>word(e)}/>
                <button onClick={displayMeaning}>Search</button>
            </div>
            <div className="content">
                
                
                <h1>{searchedWord}</h1>
                {loading && <div className="loader-container"><div class="loader"></div></div>}
                <div>
                    {wordmeaning.length !== 0 && wordmeaning.map((ans, idx) => (
                    <div key={idx}>
                        
                        {ans.phonetics && ans.phonetics.length>0?(
                            ans.phonetics.map((item,idx)=>(
                                <div key={idx}>
                                    {displayPhonetics(item)}
                                </div>
                            ))
                        ):(
                            <div>No audio available</div>
                        )}
                        <div>{ans.meanings.partOfSpeech}</div>
                        
                        {ans.meanings && ans.meanings.length > 0 ? (
                            ans.meanings.map((meaningItem, index) => (
                                <div key={index}>
                                    <div><h3>Part of speech:</h3>
                                    {meaningItem.partOfSpeech}</div>
                                    <h3>Definitions:</h3>
                                    {displayDefinitions(meaningItem)}
                                    
                                </div>
                            ))
                        ) : (
                            <div>No meanings available.</div>
                        )}
                        
                    </div>
                    
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Home;