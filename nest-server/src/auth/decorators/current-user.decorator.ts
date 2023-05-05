import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/entities";
import { ValidRoles } from "../enums/valid-roles.enum";

export const CurrentUser = createParamDecorator(
    (roles: ValidRoles[] = [], context: ExecutionContext) => {

        console.log({ roles });
        
        const ctx = GqlExecutionContext.create(context);        

        const user: User = ctx.getContext().req.user;

        if (!user)
            throw new InternalServerErrorException(`Usuario no existe en el contexto actual`);

        if (roles.length === 0) return user;

        for (const role of user.roles){
            if (roles.includes(role as ValidRoles)){
                return user;
            }
        }
        
        throw new ForbiddenException(`Usario ${ user.fullname } necesita un rol valido [${ roles }]`);
    }
) 