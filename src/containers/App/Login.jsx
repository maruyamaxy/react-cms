import React, { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';

import config from '../../config';
import './Login.scss';

export default class Login extends Component {
  static propTypes = {
    handleFbLogin: PropTypes.func.isRequired,
  }

  render() {
    const { handleFbLogin } = this.props;
    return (
      <div styleName='conteiner'>
        <FacebookLogin
          appId={config.fbAppId}
          fields='name,email,picture'
          callback={(response) => { handleFbLogin(response); }}
          autoLoad
        />
      </div>
    );
  }
}
