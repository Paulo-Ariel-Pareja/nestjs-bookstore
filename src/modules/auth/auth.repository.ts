import { EntityRepository, getConnection, Repository } from "typeorm";
import { User } from '../user/user.entity';
import { SignupDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    async singup(signUp: SignupDto){
        const {username, email, password} = signUp;
        const user = new User();
        user.username = username;
        user.email = email;

        const roleRepo: RoleRepository = await getConnection().getRepository(Role);
        const defaultRole:Role = await roleRepo.findOne({where: {name: RoleType.GENERAL}});

        user.roles = [defaultRole];

        const details: UserDetails = new UserDetails();
        user.details = details;

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();
    }
}