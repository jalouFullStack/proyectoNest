import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class Registerdto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
