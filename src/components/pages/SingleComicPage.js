import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../service/MarvelService';
import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {

        updateComics();
        
    }, [comicId]);

    const updateComics = () => {

        clearError();

        getComics(comicId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spiner}
            {content}
        </div>
    )

    function View ({comics}) {
        const {thumbnail, name, description, language, page, price} = comics;
        
        let imgStyle = {'objectFit' : 'cover'};

        if (comics.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }

        return (
            <>
                <img src={thumbnail} style={imgStyle} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{page} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}$</div>
                </div>
                <NavLink to='/comics' className="single-comic__back">Back to all</NavLink>
            </>
        )
    }
}



export default SingleComicPage;