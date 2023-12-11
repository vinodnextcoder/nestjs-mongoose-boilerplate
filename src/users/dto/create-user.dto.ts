import { IsNotEmpty, IsNumberString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  username                   : { type : String }
  first_name                 : { type : String }
  last_name                 : { type : String }
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1})
  password                   : { type : String }
  password_reset_code        : { type : String }
  email                      : { type : String }
  email_code                 : { type : String }
}
