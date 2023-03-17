import './comicsList.scss';
import { useState, useEffect } from 'react';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../service/MarvelService';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    // const [offset, setOffset] = useState(44);
    const [charEnded, setCharsEnded] = useState(false);
    const [loandingMore, setLoadingMore] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        getAllComics().then(setComics)
    }

    function ViewComics(arr) {
        const comicsw = arr.map((n) => {
            return (
                <li className="comics__item"
                    key={n.id}>
                    <a href="#">
                        <img src={n.thumbnail} alt={n.name} className="comics__item-img"/>
                        <div className="comics__item-name">{n.name}</div>
                        <div className="comics__item-price">{n.price}$</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid"> 
                {comicsw}
            </ul>
 
        )

    }
    const content = ViewComics(comics);
    return (
        <div className="comics__list">
            {content}

            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;