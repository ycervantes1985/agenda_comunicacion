import axios from 'axios';

export async function simpleGet (url) {
    try{
        console.log('from simple get',url)
        const apiResponse= await axios.get(url);
        return apiResponse
    }catch(error){
        return {error:`se ha producido un error: ${error}`}
    }
}