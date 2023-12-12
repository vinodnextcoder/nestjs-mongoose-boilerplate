import { IsNotEmpty, IsNumberString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  username                   : String
  first_name                 : String
  last_name                 : String
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1})
  password                   : String
  password_reset_code        : String
  email                      : String
  email_code                 : String
}
