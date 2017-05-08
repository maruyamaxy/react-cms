import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../../theme';
// import Login from './Login';
import Header from './Header';
import './Index.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor() {
    super();
    this.state = {
      fbid: null,
      accessToken: null,
      user: {
        name: null,
        picture: null,
      },
    };

    this.handleFbLogin = this.handleFbLogin.bind(this);
  }

  componentDidMount() {
    injectTapEventPlugin();
  }

  handleFbLogin(response) {
    this.setState({
      isLoggedIn: true,
      fbid: response.id,
      accessToken: response.accessToken,
      user: {
        name: response.name,
        picture: response.picture.data.url,
      },
    });
  }

  render() {
    const {
      user,
    } = this.state;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div styleName='container'>
          <Header user={user} />
          <div styleName='content'>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
