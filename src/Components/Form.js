import React, {useState} from "react";
import config from "../data/config.js"
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css'

const Form = ({userId,uris}) => {
    const accessToken = useSelector((state) => state.auth.accessToken);


    const [form, setForm] = useState({  
        title: '',
        description: ''
    }) 
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.title.length > 10){
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                      }
                }
                
                const optionsForm = {
                    ...requestOptions,
                    body: JSON.stringify({
                        name: form.title,
                        description: form.description,
                        public: false,
                        collaborative: false,
                    }),
                }
                
                const responseForm = await fetch(`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`, optionsForm).then(data=> data.json());
                
                const optionsAddTrack = {
                    ...requestOptions,
                    body: JSON.stringify({
                        uris
                     }),
                }
                
                await fetch(`${config.SPOTIFY_BASE_URL}/playlists/${responseForm.id}/tracks`, optionsAddTrack).then(data=> data.json());
                
                
                setForm({ title: '', description: '' });
                alert('Playlist created successfully');
                
            } catch (error) {
            alert(error);
            }
        }else{
            alert('Title must be large 10 characters');
        }
    }
    return(
        <form className="create-form" onSubmit={handleSubmit}>
            <div className="input">
                <label id='text'>Create Playlist</label> <br/>
                <TextField fullWidth
                    placeholder="Title"
                    sx={{input: {textAlign: "center"}}}
                    onChange = {handleChange} /><br/>
                <TextField fullWidth 
                    placeholder="Description"
                    sx={{input: {textAlign: "center"}}}
                    onChange = {handleChange}/>
                <br/>
            </div>
            <div>
                <Button variant="outlined" text>Create</Button>
            </div>
        </form>
    )
}
export default Form;