import IUsers from './IUsers';
// import IToken from './IToken';

export default interface IUsersService {
  checkLogin(arg: IUsers): Promise<string>;
}
