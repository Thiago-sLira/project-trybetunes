import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCardFavorite extends Component {
  state = {
    isLoading: false,
  };

  handleFavoriteChange = (elem) => {
    const { handleFavoriteSongs } = this.props;
    this.setState({ isLoading: true }, async () => {
      elem.checked = false;
      await removeSong(elem);
      await handleFavoriteSongs();
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { favoriteSong } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <ul>
          {isLoading ? <Carregando /> : favoriteSong.map((elem) => (
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

MusicCardFavorite.propTypes = {
  favoriteSong: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
  })).isRequired,
  handleFavoriteSongs: PropTypes.func.isRequired,
};

export default MusicCardFavorite;
