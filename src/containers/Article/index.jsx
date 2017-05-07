import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';

import Comment from './Comment';
import { Loading } from '../../parts';
import { Archive } from '../../actions';
import './Index.scss';

export default class Single extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      single: null,
      loading: true,
    };
    this.getArticle = this.getArticle.bind(this);
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      this.getArticle().then((obj) => {
        this.setState({
          single: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getArticle() {
    return new Promise((resolve, reject) => {
      Archive.getSigleArticle(`${this.props.params.id}`).then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  render() {
    const { single, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div styleName='container'>
        <h1>{single.title}</h1>
        <div styleName='content'>
          <Highlight innerHTML>
            {single.htmlContent}
          </Highlight>
        </div>
        <Comment />
      </div>
    );
  }
}
