import { type } from "@testing-library/user-event/dist/type"
import axios from "axios"
export const addHistory=(word)=>{
   return (dispatch)=>{
        dispatch(
            {
                type:'add_history',
                payload: word
            }
        )
   }
}

export const display=(word)=>{
    return (dispatch)=>{
         dispatch(
             {
                 type:'display',
                 payload: word
             }
         )
    }
 }

 export const failed_to_fetch=error=>{
    return (dispatch)=>{
        dispatch(
            {
                type:'failed_to_fetch',
                payload:error
            }
        )
    }
 }

 