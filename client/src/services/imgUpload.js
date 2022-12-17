import axios from 'axios';

const cloud_name = 'dcng4kp6i';
const preset = 'k2x9zhad';


export const imgUpload = async (file) =>{
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    formData.append('file', file);

    try {
        const res = await axios.post(cloudinaryUrl, formData);
        console.log(res)
        return res.data.secure_url
        /* const data = res;
        return data.secure_url;
        console.log(data) */
    } catch (error) {
        return null;
    }

};