export default class Archive {
  constructor(obj) {
    this.id = obj.Id;
    this.title = obj.Title;
    this.date = obj.Updated;
    this.dateObj = new Date(obj.Updated);
    this.excerpt = obj.Content.substr(0, 280);
    this.content = obj.Content;
  }
}
