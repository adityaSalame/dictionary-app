import React ,{useState }from "react";
import { useSelector, useDispatch } from "react-redux";
import { meaning } from "../redux/actions/action";
import { addHistory } from "../redux/actions/action";
import { failed_to_fetch } from "../redux/actions/action";
import axios from "axios";
function Home(){
    const data=useSelector(state=> state.words_array);
    const [wordmeaning,setWordmeaning]=useState([]);
    //let wordmeaning=[];
    let newWord="";
    const dispatch = useDispatch()

    function displayMeaning(){
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
        
            try{
                const url="https://api.dictionaryapi.dev/api/v2/entries/en/"+newword;
            const means=await axios.get(url);
           
            setWordmeaning(means.data);
            console.log(wordmeaning);
            // dispatch(addHistory(word))
            }
            catch(error){
                // dispatch(failed_to_fetch(error));
                console.log("no results");
            }
        
    }

    function displayDefinitions(array){
        let str="";
        for(let i=0;i<array.length;i++){
            str+=array[i].definition;
        }
        return str;
    }
    

    return(
        <div>
            <div className="navbar">
                <div className="appname"><h1>Dictonary App</h1></div>
                <div className="links">
                    <div>Home</div>
                    <div>History</div>
                </div>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search" onChange={(e)=>word(e)}/>
                <button onClick={displayMeaning}>Search</button>
            </div>
            <div className="content">
                hiii  phonetics, meanings, part of speech, definitions, and audio pronunciations.
                {wordmeaning.length !== 0 && wordmeaning.map((ans, idx) => (
                    <div key={idx}>
                        <div>{newWord}</div>
                        <div>{ans.phonetic}</div>
                        <div>{ans.meanings.partOfSpeech}</div>
                        <div>{displayDefinitions(ans.definitions)}</div>
                    </div>
                ))}
                

            </div>

        </div>
    );
}

export default Home;