import React ,{useState }from "react";
import { useParams } from "react-router-dom";
import { addHistory } from "../redux/actions/action";
import { useEffect } from "react";
import axios from "axios";


function WordDetails(){
    const {word} = useParams();
    const [loading,setLoading]=useState(false);
    const [wordmeaning,setWordmeaning]=useState([]);
    const [searchedWord,setSearchedWord]=useState("");
    //let wordmeaning=[];
    let newWord="";
    
    
   
    console.log(newWord);


    // async function meaning(newword){
    //     setSearchedWord(newWord);
    //         try{
    //             const url="https://api.dictionaryapi.dev/api/v2/entries/en/"+newword;
    //         const means=await axios.get(url);
           
    //         setWordmeaning(means.data);
    //         setLoading(false);
    //         console.log(wordmeaning,means.data);
    //         // dispatch(addHistory(word))
    //         }
    //         catch(error){
    //             // dispatch(failed_to_fetch(error));
    //             setLoading(false);
    //             console.log("no results");
    //         }
        
    // }

    
  useEffect(() => {
    setLoading(true);
    setSearchedWord(word); // Set the searched word from the URL parameter

    async function meaning(newword) {
      try {
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newword;
        const means = await axios.get(url);

        setWordmeaning(means.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("no results");
      }
    }

    meaning(word); // Call the meaning function with the word from the URL parameter
  }, [word]);

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
    )
}

export default WordDetails;