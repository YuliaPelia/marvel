

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2813600ead6a7195f6ec5f57400c79d3';

    getResource = async (url) => {
        let res = await fetch(url); // це все асинхронний код (ми не знаєм через скільки часу вернеться відповідь від сервера) не чекає інший код
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json(); 
        // зробити так щоб асинхроний код перетворювався в синхронний (для цього викор оператори async, await)
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=518&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    // getAllCharacters = () => {
    //     return this.getResource(`${this._apiBase}characters?limit=9&offset=518&${this._apiKey}`);
    // }

    
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'No data found for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

}

export default MarvelService;