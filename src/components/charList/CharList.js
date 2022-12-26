import { Component } from 'react';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 452,
        charEnded: false
    }

    marvelServiceToo = new MarvelService();

    onClickLoadMore = (offset) => {
        this.onCharListLoading();
        this.marvelServiceToo.getAllCharacters(offset)
            .then(this.onCharAllLoaded)
            .catch(this.onError)

    }

    componentDidMount() {

        this.marvelServiceToo.getAllCharacters()
        .then(this.onCharAllLoaded)
        .catch(this.onError)
    }

    onCharAllLoaded = (newCharacters) => {

        let ended = false;
        if(newCharacters.length < 9) {
            ended = true
        }

        this.setState(({offset, characters}) => ({
            characters: [...characters, ...newCharacters], 
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateAllChar = () => {
        this.onClickLoadMore()
    }



    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }





    render() {
        const {characters, loading, error, newItemLoading, offset, charEnded} = this.state;
        const items = this.renderItems(characters);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                onClick={() => this.onClickLoadMore(offset)} 
                disabled={newItemLoading}
                state={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// map -  перебирає і повертає
// forEach - не повертає а тільки перебирає

export default CharList;

