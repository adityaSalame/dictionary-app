
const initialState =[];

const searchReducer =(state=initialState, action)=>{
    if(action.type==='display'){
        return action.payload;
    }
    else if(action.type==='add_history'){
        return  [...state, action.payload]
    }
    else{
       return [action.payload]
                    
    }
}


export default searchReducer;