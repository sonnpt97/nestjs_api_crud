import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';


@Controller('users-orm')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const user = await this.usersService.findAll()
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }



  @Post('login')
  // @HttpCode(HttpStatus.OK) // Trả về HTTP status 200
  async login() {

    const payload = { sub: "12345", username: "SonNPT" };
    
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'abcasdsanhfabfhujknfachukjds',
      expiresIn: '1h',
    });
    return accessToken;
  }
}
