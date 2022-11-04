import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    nameArtist: '',
    isLoginButtonDisabled: true,
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

  render() {
    const { nameArtist, isLoginButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
              type="button"
              data-testid="search-artist-button"
              disabled={ isLoginButtonDisabled }
            >
              Pesquisar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Search;
