import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dots/create-restaurant.dto';
import { UpdateRestaurantDto } from './dots/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  // 查询店铺
  @Query(() => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return await this.restaurantService.getAllRestaurant();
  }

  // 新增店铺
  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('newRestaurant') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // 更新店铺
  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args('restaurantInfo') updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
