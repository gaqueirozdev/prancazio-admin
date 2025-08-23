import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductTypeDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
		name?: string

	@ApiProperty()
	@IsNumber()
	@IsOptional()
		loss?: number
}