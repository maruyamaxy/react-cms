import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentLink from 'material-ui/svg-icons/content/link';
import Edit from 'material-ui/svg-icons/image/edit';
import clipboard from 'clipboard-js';
import {
  AppBar,
  Popover,
  Menu,
  MenuItem,
 } from 'material-ui';

import config from '../../config';
import './Header.scss';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      siteTitle: config.siteTitle,
      open: false,
      anchorEl: null,
    };
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  handleOpenMenu(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleCloseMenu() {
    this.setState({
      open: false,
    });
  }

  linkToEdit(e) {
    e.preventDefault();
    browserHistory.push('/edit');
  }

  copyClipboard() {
    clipboard.copy({
      'text/plain': window.location.href,
    });
  }

  render() {
    const { user } = this.props;
    const {
      siteTitle,
      open,
      anchorEl,
    } = this.state;

    const picture = user.picture ? (
      <div>
        <img
          src={user.picture}
          alt={user.name}
        />
      </div>
    ) : (<div />);

    const navBtn = <IconButton onClick={this.handleOpenMenu} ><MenuIcon /></IconButton>;
    const title = <Link to='/'>{siteTitle}</Link>;
    return (
      <div styleName='conteiner'>
        <AppBar
          iconElementLeft={navBtn}
          iconElementRight={picture}
          title={title}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleCloseMenu}
        >
          <Menu>
            <MenuItem primaryText="NEW POST" leftIcon={<Edit />} onClick={this.linkToEdit} />
            <MenuItem primaryText="GET LINK" leftIcon={<ContentLink />} onClick={this.copyClipboard} />
          </Menu>
        </Popover>
      </div>
    );
  }
}
