import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private FoodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.FoodRepository.create(createFoodDto);
    return this.FoodRepository.save(food);
  }

  async findAll() {
    const foods = await this.FoodRepository.find();
    return foods;
  }

  async findOne(id: number) {
    const food = await this.FoodRepository.findOneBy({ id });
    //const food = await this.FoodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException(
        `No se encontró la comidad con el ID: ${id} proporcionado`,
      );
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.FoodRepository.findOneBy({ id });
    if (!food) {
      throw new NotFoundException(
        `No se encontró la comidad con el ID: ${id} proporcionado`,
      );
    }
    const updateFood = this.FoodRepository.merge(food, updateFoodDto);
    return this.FoodRepository.save(updateFood);
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
