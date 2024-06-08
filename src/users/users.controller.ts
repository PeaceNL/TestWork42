import { Controller, Put, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService) {}

    @Put('update-problems')
    async updateProblems() : Promise<{count: number}> {
        const count = await this.usersService.updateProblems();
        return {count};
    };

    @Get('all')
    async getAll() : Promise<User[]> {
        const arr = await this.usersService.getAll();
        return arr
    }

    @Post('create')
    async createUsers(@Body('count') count: number): Promise<{message: string}> {
        await this.usersService.createUsers(count);
        return { message: `Successfully created ${count} users.` }
    }

    
}
