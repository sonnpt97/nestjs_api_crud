import { Controller, Get, Param, Post, Query, Req, Body } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) { }
  private readonly users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ];

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get()
  getAllUsers(): string {
    return 'This action returns all users';
  }

  @Get()
  getUserByQuery(@Query('userId') userId: string) {
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      return { message: `User with ID ${userId} not found` };
    }

    return user;
  }


  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    console.log(userId);
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      return `not found`;
    }
    // Return the user data if found
    return user;
  }

  @Post('update')
  updateUser(@Body() body: any) {
    console.log(body);
    return "hehe";
  }
}
