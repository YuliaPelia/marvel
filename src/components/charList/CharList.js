import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.marvelServiceToo = new MarvelService();
        this.updateAllChar();
    }

    state = {
        characters: []
    }

    updateAllChar = () => {
        this.marvelServiceToo
            .getAllCharacters()
            .then(res => {
                console.log('charList', res.data.results)
                this.setState({
                    characters: res.data.results
                })
            })
    }

    render() {
        const {characters} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters.map(character => (
                        <li key={character.id} className="char__item">
                            <img src={character.thumbnail.path + '.' + character.thumbnail.extension} alt="abyss"/>
                            <div className="char__name">{character.name}</div>
                        </li>
                    ))}

                </ul>
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