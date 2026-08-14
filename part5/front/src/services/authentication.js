import axios from 'axios';
const baseUrl = '/api/users';


const signIn = async (formData) => {
    try{
        const result = await axios.post(`${baseUrl}/sign-in`, formData);
        return result.data;
    }catch(error){
        return error.response.data;
    }
};

const signUp = async (formData) => {
    try{
        const result = await axios.post(`${baseUrl}/sign-up`, formData);
        return result.data;
    }catch(error){
        return error.response.data;
    }
};

export default { signIn, signUp };