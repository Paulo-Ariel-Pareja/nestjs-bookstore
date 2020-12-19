import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: 'This name is not valid' })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'This description is not valid' })
    readonly description: string;
}