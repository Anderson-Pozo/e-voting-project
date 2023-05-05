import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
    admin = "admin",
    elector = "elector",
    mjrv = "mjrv"
}

registerEnumType(ValidRoles, { name: 'ValidRoles', description: 'Roles válidos para ingreso al sistema' });