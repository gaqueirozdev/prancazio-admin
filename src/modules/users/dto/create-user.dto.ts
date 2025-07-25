import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'
import { UserRoles } from '../enums/role.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty()
	@IsString()
		name: string

	@ApiProperty()
	@IsEmail()
		email: string

	@ApiProperty()
	@IsString()
	@MinLength(6)
		password: string
	
	@ApiProperty({ enum: UserRoles, default: UserRoles.ADMIN })
	@IsOptional()
	@IsEnum(UserRoles)
		role?: UserRoles
}