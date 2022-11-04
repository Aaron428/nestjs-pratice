### Args 的两种写法
1. 第一种
```
test(@Args('name') name: string): string {
  return 'hello'
}
```

2. 第二种
```
test(@Args() dataDto: DataDto): string {
  console.log(dataDto)
  return 'hello'
}
```

这两种方式传递参数的时候都是这样传的，不用放在一个对象里头
```
mutation {
  test(name: "george") {}
}
```

> 在使用 DataDto 的时候，要记得加上 @Field() 装饰器，不然在graphql 上就没有提示了，还会导致参数类型错误


### @InputType() 和 @ArgsType()
```
使用 @InputType() @Args() 中需要添加名称
async updateRestaurant(
    @Args('restaurantInfo') updateRestaurantDto: UpdateRestaurantDto,
  ) {
    console.log(updateRestaurantDto);
    return true;
  }
```