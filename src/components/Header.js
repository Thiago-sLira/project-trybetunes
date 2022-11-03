import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.hadleRenderzing();
  }

  hadleRenderzing = async () => {
    this.setState({ isLoading: true });
    const result = await getUser();
    this.setState({
      isLoading: false,
      user: result,
    });
    return result;
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Carregando /> : (
          <span data-testid="header-user-name">{ user.name }</span>) }
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
