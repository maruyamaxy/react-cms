import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import md from 'markdown-it';
import toMarkdown from 'to-markdown';
import { pull, last } from 'lodash';

import { Archive, Category } from '../../actions';
import { validation } from '../../utils';
import EditArticle from './EditArticle';
import EditSide from './EditSide';
import { Loading, Categories, CategoryFrom } from '../../parts';
import style from '../../style';
import './Index.scss';

const tabMark = 'markdown';
const tabHtml = 'html';

export default class Edit extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  };
  static defaultProps = {
    params: {
      id: '',
    },
  }

  constructor() {
    super();
    this.state = {
      article: {
        title: '',
        content: '',
        htmlContent: '',
      },
      categories: [],
      categoryLists: [],
      loading: true,
      titleError: false,
      catNameError: '',
      catSlugErrror: '',
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.sendArticle = this.sendArticle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleAddCat = this.handleAddCat.bind(this);
    this.handleRemoveCat = this.handleRemoveCat.bind(this);
    this.handleAddCatList = this.handleAddCatList.bind(this);
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.getCategories().then((obj) => {
        this.setState({
          categoryLists: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
    const article = new Promise((resolve, reject) => {
      this.getArticle().then((obj) => {
        this.setState({
          article: obj,
        });
      }).catch((err) => {
        reject(err);
      });
    });
    const res = (this.props.params.id !== '') ? article : false;
    return res;
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

  getCategories() {
    return new Promise((resolve, reject) => {
      Category.get().then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleTitle(event) {
    const val = event.target.value;
    const valid = validation.validTitle(val);
    this.setState({
      article: {
        title: val,
      },
      titleError: valid,
    });
  }

  handleContent(content, type) {
    const newContent = (type === 'markdown') ? content : toMarkdown(content);
    const htmlContent = (type === 'markdown') ? md().render(content) : content;
    this.setState({
      article: {
        content: newContent,
        htmlContent: htmlContent,
      },
    });
  }

  sendArticle(content, status) {
    console.log(content);
    console.log(status);
  }

  handleAddCatList(categoryNew) {
    const {
      categories,
      categoryLists,
    } = this.state;
    const catValid = validation.validEmpty(categoryNew.name, 'カテゴリ');
    const slugValid = validation.validNonJpanese(categoryNew.slug, 'スラッグ');

    if (catValid || slugValid) {
      this.setState({
        catNameError: catValid,
        catSlugErrror: slugValid,
      });
    } else {
      const lastCat = last(categoryLists);
      categories[categories.length] = {
        id: lastCat.id,
        name: categoryNew.name,
        slug: categoryNew.slug,
      };
      this.setState({
        categories: categories,
        catNameError: catValid,
        catSlugErrror: slugValid,
      });
    }
  }

  handleAddCat(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categories[categories.length] = categoryLists[id];
    this.setState({
      categories: categories,
      categoryLists: pull(categoryLists, categoryLists[id]),
    });
  }

  handleRemoveCat(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categoryLists[categoryLists.length] = categories[id];
    this.setState({
      categories: pull(categories, categories[id]),
      categoryLists: categoryLists,
    });
  }

  render() {
    const {
      article,
      loading,
      titleError,
      categories,
      categoryLists,
      catNameError,
      catSlugErrror,
    } = this.state;
    if (loading) return <Loading />;

    return (
      <div>
        <div styleName='container'>
          <div styleName='content'>
            <TextField
              floatingLabelText='title'
              value={article.title}
              onChange={this.handleTitle}
              errorText={titleError}
              style={style.titleField}
            />
            <EditArticle
              content={article.content}
              htmlContent={article.htmlContent}
              tabMark={tabMark}
              tabHtml={tabHtml}
              handleContent={this.handleContent}
            />
            <h3>category lists</h3>
            <Categories
              categories={categoryLists}
              handleCat={this.handleAddCat}
              type='list'
            />
            <h3>category add</h3>
            <CategoryFrom
              handleAddCatList={this.handleAddCatList}
              catNameError={catNameError}
              catSlugErrror={catSlugErrror}
            />
          </div>
          <div styleName='content'>
            <EditSide
              article={article}
              categories={categories}
              handleRemoveCat={this.handleRemoveCat}
            />
          </div>
        </div>
        <div styleName='btnWrapper'>
          <RaisedButton
            label='SAVE'
            styleName='btn'
            primary
          />
          <RaisedButton
            label='SAVE AS WIP'
            styleName='btn'
            secondary
          />
        </div>
      </div>
    );
  }
}
