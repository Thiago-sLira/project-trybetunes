import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
  state = {
    isLoading: false,
    profileInfo: {},
  };

  componentDidMount() {
    this.hadleGetUserFunction();
  }

  hadleGetUserFunction = async () => {
    this.setState({ isLoading: true });
    const result = await getUser();
    this.setState({ isLoading: false, profileInfo: result });
  };

  handleButtonEditProfileClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { isLoading, profileInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        {isLoading ? <Carregando /> : (
          <div>
            <button
              type="button"
              onClick={ this.handleButtonEditProfileClick }
            >
              Editar perfil
            </button>
            <img
              src={ profileInfo.image }
              alt={ `Foto de ${profileInfo.name}` }
              data-testid="profile-image"
            />
            <h4>Nome</h4>
            <p>{ profileInfo.name }</p>
            <h4>Email</h4>
            <p>{ profileInfo.email }</p>
            <h4>Descrição</h4>
            <p>{ profileInfo.description }</p>
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
