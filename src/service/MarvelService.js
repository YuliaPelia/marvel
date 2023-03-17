import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2813600ead6a7195f6ec5f57400c79d3';
    const _apiNum = 80;


    // будемо робити запити до нашого сервера(api)
    // запит по всіх персонажах
    const getAllCharacters = async (offset = _apiNum) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
        // res.data.results.map(); - для того щоб сформувати масив з новими обєктами
        // ?? - якщо перша змінна undefined || null тоді буде те що з права
    }


    // запит по певному одному персонажу

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 210) : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url,
            comics: char.comics.items
            
        }
    }

    const getAllComics = async() => {
        const resCom = await request('https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=999&apikey=2813600ead6a7195f6ec5f57400c79d3');
        return resCom.data.results.map(_transformComics);
    }

    const _transformComics = (n) => {
        return {
            id: n.id,
            thumbnail: n.thumbnail.path + '.' + n.thumbnail.extension,
            name: n.title,
            price: n.prices[0].price

        }
    }
    
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}

export default useMarvelService;