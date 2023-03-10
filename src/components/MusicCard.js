import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleFavoriteChange = async (elem) => {
    this.setState({ isLoading: true });
    const resultFavorites = await getFavoriteSongs();
    if (!resultFavorites || (resultFavorites.find((el) => (
      el.trackId === elem.trackId))) !== undefined) {
      elem.checked = false;
      await removeSong(elem);
    } else {
      elem.checked = true;
      await addSong(elem);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { musics } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <ul>
          {isLoading ? <Carregando /> : musics.slice(1).map((elem) => (
            <li
              key={ elem.trackId }
            >
              {elem.trackName}
              <audio data-testid="audio-component" src={ elem.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ `favorite-${elem.trackId}` }
                data-testid={ `checkbox-music-${elem.trackId}` }
              >
                Favorita
                <input
                  id={ `favorite-${elem.trackId}` }
                  type="checkbox"
                  name="valueFavorite"
                  onChange={ () => this.handleFavoriteChange(elem) }
                  checked={ elem.checked }
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;
