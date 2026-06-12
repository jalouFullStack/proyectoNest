import { PartialType } from '@nestjs/mapped-types';
import { Registerdto } from './Registerdto';

export class UpdateUserDto extends PartialType(Registerdto) {}
