import { expect } from 'chai';
import { vallidation } from '../../utils';

let text = '';
let name = 'カテゴリ';
describe('必須バリデーション', () => {
  it('エラー', () => {
    text = '';
    expect(vallidation.validEmpty(text, name)).to.equal(`${name}は必須です。`);
  });
  it('エラー無', () => {
    text = 'バリュー';
    expect(vallidation.validEmpty(text, name)).to.equal('');
  });
});


describe('タイトルバリデーション', () => {
  it('超過エラー', () => {
    text = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいう';
    expect(vallidation.validTitle(text, name)).to.equal('タイトルは32文字以内が推奨です。');
  });
  it('必須エラー', () => {
    text = '';
    expect(vallidation.validTitle(text)).to.equal('タイトルは必須です。');
  });
  it('エラー無', () => {
    text = 'タイトル';
    expect(vallidation.validTitle(text)).to.equal('');
  });
});


describe('日本語バリデーション', () => {
  it('必須エラー', () => {
    text = '';
    expect(vallidation.validNonJpanese(text, name)).to.equal(`${name}は必須です。`);
  });
  it('日本語エラー', () => {
    text = 'ほげ';
    expect(vallidation.validNonJpanese(text, name)).to.equal(`${name}は半角英数字のみです。`);
  });
  it('エラー無', () => {
    text = 'hoge123';
    expect(vallidation.validNonJpanese(text, name)).to.equal('');
  });
});
