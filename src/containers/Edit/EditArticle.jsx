import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { Tabs, Tab } from 'material-ui/Tabs';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';

import './EditArticle.scss';
import style from '../../style';

export default class EditArticle extends Component {
  static propTypes = {
    content: PropTypes.string,
    htmlContent: PropTypes.string,
    tabMark: PropTypes.string.isRequired,
    tabHtml: PropTypes.string.isRequired,
    handleContent: PropTypes.func.isRequired,
    handleUploadImage: PropTypes.func.isRequired,
  }
  static defaultProps = {
    content: '',
    htmlContent: '',
    dropZone: false,
  }

  constructor() {
    super();
    this.state = {
      tabValue: null,
    };

    this.handleTab = this.handleTab.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
  }

  componentWillMount() {
    this.setState({
      tabValue: this.props.tabMark,
    });
  }

  handleTab(value) {
    this.setState({
      tabValue: value,
    });
  }

  handleDragOver() {
    this.setState({
      dropZone: true,
    });
  }

  handleDragExit() {
    this.setState({
      dropZone: false,
    });
  }

  render() {
    const {
      content,
      htmlContent,
      handleContent,
      tabMark,
      tabHtml,
      handleUploadImage,
    } = this.props;
    const { tabValue, dropZone } = this.state;
    const dropStyle = (dropZone) ? style.show : style.hide;

    return (
      <div styleName='content'>
        <Tabs
          value={tabValue}
          onChange={this.handleTab}
          style={{ width: '100%' }}
        >
          <Tab label={tabMark} value={tabMark}>
            <textarea
              value={content}
              onChange={(event) => { handleContent(event, tabMark); }}
              onDragOver={this.handleDragOver}
            />
          </Tab>
          <Tab label={tabHtml} value={tabHtml}>
            <textarea
              value={htmlContent}
              onChange={(event) => { handleContent(event, tabHtml); }}
              onDragOver={this.handleDragOver}
            />
          </Tab>
        </Tabs>
        <Dropzone
          style={dropStyle}
          styleName='drop'
          onDrop={(file) => { handleUploadImage(file, tabValue); }}
          onDropAccepted={this.handleDragExit}
          onDragLeave={this.handleDragExit}
          onDropRejected={this.handleDragExit}
          accept="image/*"
        ><p><PinDrop style={style.icon} /><br />Drop image</p>
        </Dropzone>
      </div>
    );
  }
}
