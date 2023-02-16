export default class UserDto {
  id;
  email;
  username;
  roleId;
  
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.roleId = model.roleId;
  }
}
