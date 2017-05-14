import md from 'markdown-it';

export default class Single {
  constructor(obj) {
    this.title = obj.Title;
    this.date = obj.date;
    this.dateObj = new Date(obj.Updated);
    this.content = obj.Content;
    this.htmlContent = md().render(obj.Content);
  }
}
