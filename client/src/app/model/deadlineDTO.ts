export class DeadlineDTO {

  _id: string | undefined;
  title: string;
  authorId: string;
  description: string;
  creationDate: string;
  expirationDate: string;

  constructor(_id: string | undefined, title: string, authorId: string, description: string, creationDate: string, expirationDate: string) {
    this._id = _id;
    this.title = title;
    this.authorId = authorId;
    this.description = description;
    this.creationDate = creationDate;
    this.expirationDate = expirationDate;
  }
}
