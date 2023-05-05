import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () =>{

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
        )
        const data = await response.json();
        console.log(data)
        setContent(data.results);
        setnumOfPages(500);
        console.log(numOfPages)
    };  

    useEffect(()=>{
        fetchMovies();
    },[page, genreforURL])

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres
            type="movie"
            selectedGenres={selectedGenres}
            genres={genres}
            setSelectedGenres={setSelectedGenres}
            setGenres={setGenres}
            setPage={setPage}/>
            <div className="trending">
                {
                    content && content.map((c)=>(
                        <SingleContent key={c.id} c={c} media_type="movie"/>
                        ))
                }
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
            
        </div>
    )
}

export default Movies;