import { ConflictException, Injectable } from '@nestjs/common';
import { Registerdto } from './dto/Registerdto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(user: Registerdto) {
    const exist = await this.userRepo.findOne({ where: { email: user.email } });
    if (exist) throw new ConflictException('El email y está registrado');
    const hashed = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepo.create({ ...user, password: hashed });
    return this.userRepo.save(newUser);
  }

  async findByEmail(email: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
