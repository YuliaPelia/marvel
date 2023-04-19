import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../service/MarvelService';
import './comicsList.scss';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(356);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [loandingMore, setLoadingMore] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setLoadingMore(false) : setLoadingMore(true);
        getAllComics(offset)
            .then(onComicsAllLoaded)
    }

    const onComicsAllLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            ended = true
        }

        setComics(comics => [...comics, ...newComics]);
        setLoadingMore(loandingMore => false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    const comicsRefs = useRef([]);

    function ViewComics(arr) {
        const comics = arr.map((n, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if(n.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="comics__item"
                    tabIndex={0}
                    ref={el => comicsRefs.current[i] = el}
                    key={i}
                    onClick={() => {
                        props.onComicsSelected(n.id);
                    }}>

                    <NavLink to={`/comics/${n.id}`} /* href="/2" */>
                        <img src={n.thumbnail} alt={n.name} className="comics__item-img"/>
                        <div className="comics__item-name">{n.name}</div>
                        <div className="comics__item-price">{n.price}$</div>
                    </NavLink>
                </li>
            )
        });

        return (
            <ul className="comics__grid"> 
                {comics}
            </ul>
 
        )

    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loandingMore ? <Spinner/> : null;
    const content = ViewComics(comics);

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}

            <button 
            className="button button__main button__long"
            disabled={loandingMore}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
ComicsList.propTypes = {
    onComicsSelected: PropTypes.func.isRequired
}
export default ComicsList;