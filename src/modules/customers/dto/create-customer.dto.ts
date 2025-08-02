import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Gender } from '../enums/gender.enum'
import { CivilState } from '../enums/civil-state.enum'

export class CreateCustomerDto {
	@ApiProperty()
	@IsString()
		name: string

	@ApiProperty()
	@IsString()
		phone: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		email: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		zipCode: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		state: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		city: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		neighborhood: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		address: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		streetNumber: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		complement: string

	@ApiProperty({ enum: Gender })
	@IsEnum(Gender)
		gender: Gender

	@ApiProperty({ enum: CivilState })
	@IsEnum(CivilState)
	@IsOptional()
		civilState: CivilState 
}