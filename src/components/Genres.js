import { useEffect } from "react";
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { green } from '@mui/material/colors';
import './Genres.css'
const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
const handleAdd=(genre)=>{
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g)=>g.id!==genre.id))
    setPage(1);
}

const handleRemove=(genre)=>{
    setSelectedGenres(
        selectedGenres.filter((selected)=>selected.id!==genre.id))
    setGenres([...genres, genre]);
    setPage(1);
}

    const fetchGenres = async() =>{
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`
        )
        const data = await response.json();
        setGenres(data.genres);
        }

        console.log(genres);

        useEffect(() => {
        fetchGenres();

        return ()=>{
            setGenres({})
        };
        }, [])
    
        return(
            <div style={{padding:"6px 0", color:"white"}}>
                {Array.isArray(selectedGenres) ? selectedGenres && selectedGenres.map((genre)=>(
                    <Chip label={genre.name}
                    style={{margin: 2}}
                    clickable
                    size="small"
                    color="primary"
                    key={genre.id}
                    onDelete={()=>handleRemove(genre)}
                    //color="primary" 
                    //deleteIcon={<DoneIcon />} 
                    //onDelete={handleDelete}
                    />
                )):null}
                {Array.isArray(genres) ? genres && genres.map((genre)=>(
                    <Chip label={genre.name}
                    style={{margin: 2 }}
                    clickable
                    size="small"
                    key={genre.id}
                    onClick={()=>handleAdd(genre)}
                    //color="primary" 
                    //deleteIcon={<DoneIcon />} 
                    //onDelete={handleDelete}
                    />
                )):null}
            </div>
            
        )
    }
 
export default Genres;