import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'
import { UserRoles } from '../enums/role.enum'

export class CreateUserDto {
	@IsString()
		name: string

	@IsEmail()
		email: string

	@IsString()
	@MinLength(6)
		password: string
	
	@IsOptional()
	@IsEnum(UserRoles)
		role?: UserRoles
}