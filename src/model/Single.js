import md from 'markdown-it';

export default class Single {
  constructor(obj) {
    this.title = obj.title;
    this.date = obj.date;
    this.dateObj = new Date(obj.modified);
    this.content = obj.content;
    this.htmlContent = md().render(obj.content);
  }
}
