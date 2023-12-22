import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'testname', description: 'username of the user' })
  @IsNumberString()
  @IsNotEmpty()
  username: String;
  @ApiProperty({ example: 'Pradip', description: 'first of the user' })
  first_name: String;
  @ApiProperty({ example: 'Patil', description: 'lastname of the user' })
  last_name: String;
  @ApiProperty({ example: 'Pradipatil1@', description: 'Password length min 8,1 lowerscase and uppercase letter, 1 number ,1symbol' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: String;
  password_reset_code?: String;
  @ApiProperty({ example: 'Patil@test.com', description: 'email of the user' })
  email: String;
  @ApiPropertyOptional({ example: 'SDD1333', description: 'email code of the user' })
  email_code?: String;
  @IsOptional()
  @ApiPropertyOptional({ example: '22221111', description: 'email code of the user' })
  activation_code?: string;
  @ApiProperty({  description: 'Date of creation' })
  @IsOptional()
  createdAt?: Date;
  @ApiProperty({  description: 'Date of updated' })
  @IsOptional()
  updatedAt?: Date;
}
