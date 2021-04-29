export class UserDTO {

  _id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this.name = name;
    this.email = email;
  }
}
