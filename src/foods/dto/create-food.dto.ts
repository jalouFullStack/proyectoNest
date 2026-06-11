import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsNumber()
  price!: number;
  @IsNotEmpty()
  @IsString()
  description!: string;
  @IsNotEmpty()
  @IsString()
  img!: string;
  @IsNotEmpty()
  @IsString()
  category!: string;
}
