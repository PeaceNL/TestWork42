import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}
    async updateProblems(): Promise<number> {
        const userWithProblems = await this.usersRepository.find({where : {problems: true}});
        const count = userWithProblems.length;

        await this.usersRepository.update({problems: true}, {problems: false});

        return count;
    }
    async getAll() : Promise<User[]> {
        const allUsers = await this.usersRepository.find();
        return allUsers;
    }
   
    async createUsers(count: number): Promise<void> {
        const users: User[] = [];
        for (let i = 0; i < count; i++) {
            const user = new User();
            user.firstName = 'User' + i;
            user.lastName = 'Lastname' + i;
            user.age = Math.floor(Math.random() * 80) + 18; 
            user.gender = (Math.random()*100) % 2 === 0 ? 'male' : 'female'; 
            user.problems = Math.random() < 0.1;
            users.push(user);
        }
        await this.usersRepository.save(users);        
        console.log('Userы созданы');
    }
}
