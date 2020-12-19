import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

@Exclude()
export class ReadRoleDto {
    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: 'This name is not valid' })
    readonly name: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'This description is not valid' })
    readonly description: string;
}