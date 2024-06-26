import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    createUser(createUserDTO: CreateUserDTO) {
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }

    getUsers() {
        return this.userModel.find();
    }

    getUserById(id: string){
        return this.userModel.findById(id)
    }

    updateUser(id: string, UpdateUserDTO: UpdateUserDTO) {
        return this.userModel.findByIdAndUpdate(id, UpdateUserDTO)
    }
}