import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserRoles } from '../enums/role.enum'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty()
	@IsOptional()
  @IsString()
  	name?: string

	@ApiProperty()
  @IsOptional()
  @IsEmail()
  	email?: string

	@ApiProperty({ enum: UserRoles, default: UserRoles.ADMIN })
  @IsOptional()
  @IsEnum(UserRoles)
  	role?: UserRoles

	@ApiProperty()
  @IsOptional()
  	isActive?: boolean
}