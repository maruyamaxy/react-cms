import React, { Component } from 'react';


export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <p>404 NOT FOUND!!</p>
        <p>こちらのコンテンツは見つかりませんでした。</p>
        <p>削除された可能性、URLが変更になった可能性がありますので、こちらからお探し下さい。</p>
      </div>
    );
  }
}
