import React, { Component } from 'react';
import Highlight from 'react-highlight';
import md from 'markdown-it';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import style from '../../style';
import './Comment.scss';

const tabComment = 'comment';
const tabPrev = 'preveiw';

export default class Comment extends Component {
  constructor() {
    super();
    this.state = {
      conmment: '',
      tabValue: tabComment,
    };

    this.handleTab = this.handleTab.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  handleTab(value) {
    this.setState({
      tabValue: value,
    });
  }

  handleComment(event) {
    const val = event.target.value;
    this.setState({
      conmment: val,
    });
  }

  handleSendComment() {

  }

  render() {
    const {
      conmment,
      tabValue,
    } = this.state;

    return (
      <div styleName='container'>
        <Tabs
          value={tabValue}
          onChange={this.handleTab}
          style={{
            width: '100%',
          }}
        >
          <Tab label={tabComment} value={tabComment}>
            <textarea
              value={conmment}
              onChange={this.handleComment}
            />
          </Tab>
          <Tab label={tabPrev} value={tabPrev}>
            <Highlight styleName='content' innerHTML>
              {md().render(conmment)}
            </Highlight>
          </Tab>
        </Tabs>
        <RaisedButton
          label='ADD'
          onClick={this.handleSendComment}
          style={style.catagoryBtn}
          icon={<CommentIcon style={style.icon} />}
          primary
        />
      </div>
    );
  }
}
