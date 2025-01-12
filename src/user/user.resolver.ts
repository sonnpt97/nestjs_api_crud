import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDTO } from './model/user.model';
import { UsersService } from 'src/sql/users/users.service';
import { Int } from '@nestjs/graphql';
import { UserParams } from './userparams';

@Resolver()
export class UserResolver {
    constructor(readonly userService: UsersService) { }

    @Query(() => [UserDTO])
    async users(): Promise<UserDTO[]> {
        const users = await this.userService.getUsersWithProfiles();
        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            profile: user.profile
        }));
    }

    @Query(() => UserDTO)
    async user(@Args('id', { type: () => Int }) id: number): Promise<UserDTO> {
        return this.userService.getUserById(id);
    }

    @Mutation(() => UserDTO)
    async createUser(@Args('user') user: UserParams): Promise<UserDTO> {
        return this.userService.createUser(user);
    }
}

