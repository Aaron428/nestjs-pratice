import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dots/create-restaurant.dto';
import { UpdateRestaurantDto } from './dots/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {
    // console.log(restaurants);
  }

  getAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(
    newRestaurantInput: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(newRestaurantInput);
    return this.restaurants.save(newRestaurant);
  }

  async updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return await this.restaurants.update(id, data);
  }
}
