import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  async searchUsers(@Query() search: SearchUserDto): Promise<User[]> {
    console.log(search);
    return this.usersService.search(search.q || '', search.skip, search.limit);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto.email, createUserDto.age);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
