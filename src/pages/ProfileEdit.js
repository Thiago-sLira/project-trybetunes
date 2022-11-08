import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    emailProfile: '',
    nameProfile: '',
    imageProfile: '',
    descriptionProfile: '',
    isButtonDisabled: true,
  };

  componentDidMount() {
    this.hadleGetUserFunction();
    this.setState({ isButtonDisabled: false });
  }

  enableButtonEditProfile = () => {
    const { nameProfile, emailProfile, imageProfile, descriptionProfile } = this.state;
    const verifyInputsLength = nameProfile.length > 0
    && emailProfile.length > 0
    && imageProfile.length > 0
    && descriptionProfile.length > 0;
    this.setState({ isButtonDisabled: !verifyInputsLength });
    console.log(emailProfile);
  };

  hadleGetUserFunction = async () => {
    this.setState({ isLoading: true });
    const result = await getUser();
    this.setState({
      isLoading: false,
      emailProfile: result.email,
      nameProfile: result.name,
      imageProfile: result.image,
      descriptionProfile: result.description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableButtonEditProfile());
  };

  handleButtonEditProfile = async () => {
    const { nameProfile, emailProfile, imageProfile, descriptionProfile } = this.state;
    const objectProfile = {
      name: nameProfile,
      email: emailProfile,
      image: imageProfile,
      description: descriptionProfile,
    };
    this.setState({ isLoading: true });
    const { history } = this.props;
    history.push('/profile');
    await updateUser(objectProfile);
    this.setState({ isLoading: false });
  };

  render() {
    const {
      isLoading, isButtonDisabled, descriptionProfile,
      nameProfile, emailProfile, imageProfile,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        ProfileEdit
        {isLoading ? <Carregando /> : (
          <div>
            <img
              src={ imageProfile }
              alt={ `Foto de ${nameProfile}` }
              data-testid="profile-image"
            />
            <label htmlFor="image-profile-input">
              <input
                type="text"
                name="imageProfile"
                id="image-profile-input"
                placeholder="Link para imagem ..."
                value={ imageProfile }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </label>
            <label htmlFor="name-profile-input">
              <h4>Nome</h4>
              <input
                type="text"
                name="nameProfile"
                id="name-profile-input"
                placeholder="Digite o nome ..."
                value={ nameProfile }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email-profile-input">
              <h4>Email</h4>
              <input
                type="email"
                name="emailProfile"
                id="email-profile-input"
                placeholder="Digite o email ..."
                value={ emailProfile }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description-profile-input">
              <h4>Descrição</h4>
              <textarea
                name="descriptionProfile"
                id="description-profile-input"
                cols="30"
                rows="10"
                value={ descriptionProfile }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
            </label>
            <button
              type="button"
              onClick={ this.handleButtonEditProfile }
              disabled={ isButtonDisabled }
              data-testid="edit-button-save"
            >
              salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
