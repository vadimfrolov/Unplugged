import { GET_ARTIST_ID, GET_ARTIST_INFO } from './types';


const getArtistIdAC = id => {
  return {
    type: GET_ARTIST_ID,
    id: id,
  }
};

const getArtistInfoAC = result => {
  return {
    type: GET_ARTIST_INFO,
    artist: result,
  }
};

const getArtistId = (text) => {
  return async dispatch => {
    const resp = await fetch("/getid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await resp.json();
    dispatch(getArtistIdAC(data.id))
  };
};

const getArtistInfo = (text) => {
  return async dispatch => {
    const resp = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await resp.json();
    const { name, bio, tags, similar } = data.dataSearch.artist
    const artist = {
      name: name,
      bio: bio,
      tags: tags,
      similar: similar,
    }
    dispatch(getArtistInfoAC(artist))
  };
};


export { getArtistId, getArtistInfo };
