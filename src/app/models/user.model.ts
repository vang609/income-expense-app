export class User {

  static fromFirebase( { email, name, uid } ) {
    return new User( uid, name, email );
  }

  constructor(
    public uid: string,
    public name: string,
    public email: string
    ) {}
}
