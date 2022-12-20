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
        error: false
    }

    marvelServiceToo = new MarvelService();

    componentDidMount() {

        this.marvelServiceToo.getAllCharacters()
        .then(this.onCharAllLoaded)
        .catch(this.onError)
    }

    onCharAllLoaded = (characters) => {
        this.setState({
            characters, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateAllChar = () => {
        this.marvelServiceToo
            .getAllCharacters()
            .then(this.onCharAllLoaded)
            .catch(this.onError)
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
        const {characters, loading, error} = this.state;
        const items = this.renderItems(characters);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// map -  перебирає і повертає
// forEach - не повертає а тільки перебирає

export default CharList;

