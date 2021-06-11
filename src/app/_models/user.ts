export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;


  constructor() {
    this.id = 0;
    this.username = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.token = "";
  }
}
