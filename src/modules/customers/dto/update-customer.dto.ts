import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { Gender } from '../enums/gender.enum'
import { CivilState } from '../enums/civil-state.enum'

export class UpdateCustomerDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
		name?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		phone?: string

	@ApiProperty()
	@IsEmail()
	@IsOptional()
		email?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		zipCode?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		state?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		city?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		neighborhood?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		address?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		streetNumber?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		complement?: string

	@ApiProperty({ enum: Gender })
	@IsEnum(Gender)
	@IsOptional()
		gender?: Gender

	@ApiProperty({ enum: CivilState })
	@IsEnum(CivilState)
	@IsOptional()
		civilState?: CivilState 
}