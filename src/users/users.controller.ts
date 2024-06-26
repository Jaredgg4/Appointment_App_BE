import { Controller, Post, Body, Get, Param, HttpException, Patch } from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}
    @Post()
    createUser(@Body() CreateUserDTO: CreateUserDTO) {
        console.log(CreateUserDTO)
        return this.usersService.createUser(CreateUserDTO)
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) throw new HttpException('User not found', 404)
        const findUser = await this.usersService.getUserById(id)
        if(!findUser) throw new HttpException('User not found', 404)
        return findUser;
    }

    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() UpdateUserDTO: UpdateUserDTO) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Invalid ID', 400);
        return this.usersService.updateUser(id, UpdateUserDTO)
    }
}