//Will create a playlist array

class Song {
    songName;
    artistName;
    genres;

    constructor(songName, artistName, genres){
        songName = this.songName;
        artistName = this.artistName;
        genres = this.genres;
    }

    getSongName(){
        return this.songName;
    }

    getArtistName(){
        return this.artistName;
    }

    getGenreList(){
        return this.genres;
    }
}