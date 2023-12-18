import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import  { RefresToken } from './schemas/refreshtoken.schema';
import * as bcrypt from 'bcrypt';
import { userData } from 'src/interface/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
  @InjectModel(RefresToken.name) private readonly RefresTokenModel: Model<RefresToken>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password  =  hashedPassword;
    const createduUser = await this.userModel.create(createUserDto);
    return createduUser;
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
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }

  async updateOne(userId: Types.ObjectId | String , data: userData) {
    await this.userModel.updateOne({_id:userId}, data);
  }

  async createRefreshToken(createUserDto: CreateUserDto): Promise<Boolean> {
    const createduUser = await this.RefresTokenModel.create(createUserDto);
    return true;
  }
}
