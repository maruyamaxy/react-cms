import { expect } from 'chai';
import { validation } from '../../utils';

let text = '';
let name = 'カテゴリ';
describe('必須バリデーション', () => {
  it('エラー', () => {
    text = '';
    expect(validation.validEmpty(text, name)).to.equal(`${name}は必須です。`);
  });
  it('エラー無', () => {
    text = 'バリュー';
    expect(validation.validEmpty(text, name)).to.equal('');
  });
});


describe('タイトルバリデーション', () => {
  it('超過エラー', () => {
    text = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいう';
    expect(validation.validTitle(text, name)).to.equal('タイトルは32文字以内が推奨です。');
  });
  it('必須エラー', () => {
    text = '';
    expect(validation.validTitle(text)).to.equal('タイトルは必須です。');
  });
  it('エラー無', () => {
    text = 'タイトル';
    expect(validation.validTitle(text)).to.equal('');
  });
});


describe('日本語バリデーション', () => {
  it('必須エラー', () => {
    text = '';
    expect(validation.validNonJpanese(text, name)).to.equal(`${name}は必須です。`);
  });
  it('日本語エラー', () => {
    text = 'ほげ';
    expect(validation.validNonJpanese(text, name)).to.equal(`${name}は半角英数字のみです。`);
  });
  it('エラー無', () => {
    text = 'hoge123';
    expect(validation.validNonJpanese(text, name)).to.equal('');
  });
});
