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

  fetchGetMusics = async (id) => {
    if (JSON.parse(localStorage.getItem('favorite_songs')).length === 0
    || !JSON.parse(localStorage.getItem('favorite_songs'))) {
      const result = await getMusics(id);
      this.setState({ musics: result, isLoading: false });
    } else {
      const result = await getFavoriteSongs();
      this.setState({ musics: result, isLoading: false });
    }
  };

  render() {
    const { musics, isLoading } = this.state;
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
