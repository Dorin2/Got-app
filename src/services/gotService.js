export default class GotService{

    constructor() {
        this._apiBase ='https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    
        }
    
        const some = await res.json();
    
        return some;
    }

    getAllCharacters = async()=>{
       const res = await this.getResource('/characters?page=5&pageSize=10');
       return res.map(this._transformCharacter)
    }
    getCharacter= async(id)=>{
        const  character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses= async(id)=>{
        return this.getResource(`/houses/`);
    }

    getHouse= async(id)=>{
        return this.getResource(`/houses/${id}/`);

    }
    getAllBooks= async()=>{
        return this.getResource(`/books/`);
    }

    _transformCharacter(char){
        const missing = "Missing information";

        if(char.died === ""){
            char.died= missing;
        }
        if(char.gender === ""){
            char.gender= missing;
        }
        if(char.born === ""){
            char.born= missing;
        }
        if(char.culture === ""){
            char.culture= missing;
        }

        return{
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    
    _transformHouse(house){
        return{
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlors,
            avcestralWeapons: house.ancestralWeapons
        }
    }
    
    _transformBook(book){
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

}

 