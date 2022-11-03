import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
