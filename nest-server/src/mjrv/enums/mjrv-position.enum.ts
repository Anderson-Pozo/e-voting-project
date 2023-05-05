import { registerEnumType } from "@nestjs/graphql";


export enum MjrvPosition {
    Presidente = 'Presidente',
    Secretario = 'Secretario',
    Vocal = 'Vocal'
}

registerEnumType(MjrvPosition, {
    name: "MjrvPosition",
    description: "Cargos disponibles para Mjrv",
    valuesMap: {
        Presidente: {
            description: "Presidente de la junta"
        },
        Secretario: {
            description: "Secretario de la junta"
        },
        Vocal: {
            description: "Vocal de la junta"
        }
    }
})