import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCardFavorite from '../components/MusicCardFavorite';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSong: [],
  };

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  handleFavoriteSongs = async () => {
    const resultFavorites = await getFavoriteSongs();
    this.setState({ favoriteSong: resultFavorites });
  };

  render() {
    const { favoriteSong, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {isLoading ? <Carregando /> : (
          <MusicCardFavorite favoriteSong={ favoriteSong } />
        )}
      </div>
    );
  }
}

export default Favorites;
