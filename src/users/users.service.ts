import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { userData } from 'src/interface/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password  =  hashedPassword;
    const createdCat = await this.userModel.create(createUserDto);
    return createdCat;
  }

  async findAll(): Promise<userData[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<userData> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneUser(email: string): Promise<userData> {
    return this.userModel.findOne({ email: email }).exec();
  }
  async delete(id: string) {
    const deletedCat = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
