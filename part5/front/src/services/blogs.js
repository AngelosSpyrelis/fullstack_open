import axios from 'axios';
const baseUrl = '/api/blogs';


const getBlogs = async () => {
    try{

        const response = await axios.get(`${ baseUrl }/`);
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const postBlog = async (formData, token) => {
    try{
        const response = await axios.post(`${ baseUrl }/`, formData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const likeBlog = async (id, token) => {
    try{
        const response = await axios.put(`${ baseUrl }/like/${id}`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const deleteBlog = async (id, token) => {
    try{
        await axios.delete(`${ baseUrl }/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            data:{
                id:id
            }
        });
        return { success: true };
    }catch(error){
        return error.response.data;
    }
};

export default { getBlogs, postBlog, likeBlog, deleteBlog };