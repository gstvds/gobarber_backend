import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  /**
   * Busca um usuário pelo id
   * @param id id do usuário
   */
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  /**
   * Busca um usuário por email
   * @param email email do usuário
   */
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  /**
   * Cria um novo usuário
   * @param userData corpo de um usuário com `name`, `email` e `password`
   */
  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);
    await this.ormRepository.save(appointment);

    return appointment;
  }

  /**
   * Atualiza um usuário já existente
   * @param user usuário que será atualizado
   */
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
