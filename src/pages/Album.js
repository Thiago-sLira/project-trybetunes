import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    isLoading: true,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchGetMusics(id);
  }

  hadleAPIRequisition = (result, resultFavorites) => {
    const mapMusics = result.map((music) => {
      const find = resultFavorites.find((musicFavorite) => (
        music.trackId === musicFavorite.trackId));
      if (!find) {
        music.checked = false;
        return music;
      }
      music.checked = true;
      return music;
    });
    return mapMusics;
  };

  fetchGetMusics = async (id) => {
    // if (!JSON.parse(localStorage.getItem('favorite_songs'))
    // || JSON.parse(localStorage.getItem('favorite_songs')).length === 0) {
    const resultFavorites = await getFavoriteSongs();
    const result = await getMusics(id);
    const resultFinalSongs = this.hadleAPIRequisition(result, resultFavorites);
    this.setState({ musics: resultFinalSongs, isLoading: false });
  };

  render() {
    const { musics, isLoading } = this.state;
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Carregando /> : (
          <div>
            <h3 data-testid="artist-name">{musics[0].artistName}</h3>
            <h4 data-testid="album-name">{musics[0].collectionName}</h4>
            <MusicCard musics={ musics } />
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
