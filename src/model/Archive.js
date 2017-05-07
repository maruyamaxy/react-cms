export default class Archive {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.date = obj.modified;
    this.dateObj = new Date(obj.modified);
    this.excerpt = obj.content.substr(0, 280);
    this.content = obj.content;
  }
}
