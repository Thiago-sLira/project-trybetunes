import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  state = {
    nameArtist: '',
    nameArtistShow: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    isForm: true,
    isArtist: false,
    artist: [],
  };

  enableSearchButton = () => {
    const { nameArtist } = this.state;
    const nameArtistLength = nameArtist.length > 1;
    if (nameArtistLength) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableSearchButton);
  };

  hadleButtonClick = async () => {
    const { nameArtist } = this.state;
    this.setState({
      isLoginButtonDisabled: true,
      isForm: false,
      isLoading: true,
      isArtist: true,
      nameArtistShow: nameArtist,
      nameArtist: '',
    });
    const result = await searchAlbumsAPI(nameArtist);
    console.log(result);
    this.setState({ isLoading: false, artist: result, isForm: true });
  };

  render() {
    const {
      nameArtist, isForm, isArtist, artist, nameArtistShow,
      isLoginButtonDisabled, isLoading,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isForm && (
          <form onSubmit={ this.hadleButtonClick }>
            <fieldset>
              <legend>Pesquisa</legend>
              <label htmlFor="input-artists">
                <input
                  id="input-artists"
                  type="text"
                  data-testid="search-artist-input"
                  name="nameArtist"
                  value={ nameArtist }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ isLoginButtonDisabled }
              >
                Pesquisar
              </button>
            </fieldset>
          </form>)}
        {isLoading && <Carregando />}
        {isArtist && (
          <h4>
            Resultado de álbuns de:
            {' '}
            {nameArtistShow}
          </h4>
        )}
        {artist.length === 0 ? <h3>Nenhum álbum foi encontrado</h3> : (
          <div>
            <ul>
              {artist.map((album) => (
                <li key={ album.collectionId }>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h5>{ album.collectionName }</h5>
                  <p>{ album.artistName }</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Album
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
