import React, { useState } from 'react'
import config from '../data/config.js'
import { useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./index.css"

 const SearchBar = (props) =>{
    const [text, setText] = useState('');
    const accessToken = useSelector((state) => state.auth.accessToken);
    const handleInput = (e) =>{
        setText(e.target.value);
    }
    const onSubmit =async (e) =>{
        e.preventDefault();

        var requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            }
          };

          try{
              const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
              .then((data) => data.json());

            console.log(props);
            const tracks = response.tracks.items;
            props.onSuccess(tracks);
            }catch (e) 
            {
             alert(e);
        }
        e.target.blur();
    }
     return(

        
        <form onSubmit={onSubmit}>
            
             <TextField fullWidth  
                    type="text"
                    required
                    sx={{input: {textAlign: "center"}}}
                    onChange={handleInput}/>
               
                <Button variant="outlined" text>
                     Search
                </Button>
             
        </form>
        

    )
  }
export default SearchBar;




















// export default class SearchBar extends Component {
//     state = {
//     text: '',
//   }

//   handleInput(e) {
//     this.setState({ text: e.target.value });
//   }

//   async onSubmit(e) {
//     e.preventDefault();

//     const { text } = this.state;

//     var requestOptions = {
//       headers: {
//         'Authorization': 'Bearer ' + this.props.accessToken,
//         'Content-Type': 'application/json',
//       },
//     };

//     try {
//       const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
//         .then((data) => data.json());

//       console.log(this.props);
//       const tracks = response.tracks.items;
//       this.props.onSuccess(tracks);
//     } catch (e) {
//       alert(e);
//     }

//     e.target.blur();
//   }

//   render() {
//     return (
//       <form className="form__search" onSubmit={(e) => this.onSubmit(e)}>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="form__search__input"
//           required
//           onChange={(e) => this.handleInput(e)}
//         />
//         <button id="btn-search" type='submit'>Search</button>
//       </form>
//     )
//   }
// }