import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserRoles } from '../enums/role.enum'

export class UpdateUserDto {
	@IsOptional()
  @IsString()
		name?: string

  @IsOptional()
  @IsEmail()
  	email?: string

  @IsOptional()
  @IsEnum(UserRoles)
  	role?: UserRoles

  @IsOptional()
  	isActive?: boolean
}