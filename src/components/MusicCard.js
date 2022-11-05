import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        <ul>
          {musics.slice(1).map((elem) => (
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
