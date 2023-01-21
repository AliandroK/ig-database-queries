import { getRepository, Repository, ReturningStatementNotSupportedError } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    
    const user = (await this.repository
                 .findOne({
                   relations:["games"],
                   where: {id: user_id}}
                   )) as User ;
     
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("select * from users order by first_name asc "); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository
    .query("select * from users where LOWER(users.first_name) = LOWER($1) and LOWER(users.last_name) = LOWER($2) ", 
    [first_name, last_name]); // Complete usando raw query
  }
}
