import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  state = {
    nameLogin: '',
    isLoginButtonDisabled: true,
    isLoading: false,
  };

  enableLoginButton = () => {
    const { nameLogin } = this.state;
    const nameLoginLength = nameLogin.length > 2;
    if (nameLoginLength) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableLoginButton);
  };

  hadleButtonClick = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const { isLoginButtonDisabled, nameLogin, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {
          isLoading
            ? <Carregando />
            : (
              <form>
                <fieldset>
                  <legend><h4>Login</h4></legend>
                  <label htmlFor="login-input-name">
                    <input
                      id="login-input-name"
                      type="text"
                      data-testid="login-name-input"
                      name="nameLogin"
                      value={ nameLogin }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ isLoginButtonDisabled }
                    onClick={ this.hadleButtonClick }
                  >
                    Entrar
                  </button>
                </fieldset>
              </form>)
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
