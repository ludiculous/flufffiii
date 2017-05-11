import {FETCH_PETSLIST} from './types';

export const fetchPetsList = ()=>{

    return(dispatch)=>{
        fetch('https://sleepy-taiga-54562.herokuapp.com/api')
            .then(resp=>{
                return  resp.json()
            }).then(data=>{
                dispatch({
                    type:FETCH_PETSLIST,
                    payload:data.photodata
                })
              console.log(data.photodata);
            })
            .catch(()=>{
                console.log('Error Fetching Data');
            })
    }

}
