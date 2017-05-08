import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';

import style from '../../style';
import { validation } from '../../utils';
import './index.scss';

export default class CategoryFrom extends Component {
  static propTypes = {
    handleAddCatList: PropTypes.func.isRequired,
    catNameError: PropTypes.string.isRequired,
    catSlugErrror: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      categoryNew: {
        name: '',
        slug: '',
      },
      catNameError: '',
      catSlugErrror: '',
    };

    this.handleCatName = this.handleCatName.bind(this);
    this.handleSlugName = this.handleSlugName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { catNameError, catSlugErrror } = nextProps;
    this.setState({
      catNameError: catNameError,
      catSlugErrror: catSlugErrror,
    });
    if (!catNameError && !catSlugErrror) {
      this.setState({
        categoryNew: {
          name: '',
          slug: '',
        },
      });
    }
  }

  handleCatName(event) {
    const val = event.target.value;
    const valid = validation.validEmpty(val, 'カテゴリ');
    this.setState({
      categoryNew: {
        name: val,
        slug: this.state.categoryNew.slug,
      },
      catNameError: valid,
    });
  }

  handleSlugName(event) {
    const val = event.target.value;
    const valid = validation.validNonJpanese(val, 'スラッグ');
    this.setState({
      categoryNew: {
        name: this.state.categoryNew.name,
        slug: val,
      },
      catSlugErrror: valid,
    });
  }

  render() {
    const {
      categoryNew,
      catNameError,
      catSlugErrror,
    } = this.state;
    const { handleAddCatList } = this.props;

    return (
      <div>
        <div styleName='container'>
          <TextField
            floatingLabelText='category'
            style={style.catagoryForm}
            value={categoryNew.name}
            onChange={this.handleCatName}
            errorText={catNameError}
          />
          <TextField
            floatingLabelText='slug'
            style={style.catagoryForm}
            value={categoryNew.slug}
            onChange={this.handleSlugName}
            errorText={catSlugErrror}
          />
        </div>
        <RaisedButton
          label='ADD'
          onClick={() => { handleAddCatList(categoryNew); }}
          style={style.catagoryBtn}
          primary
        />
      </div>
    );
  }
}
