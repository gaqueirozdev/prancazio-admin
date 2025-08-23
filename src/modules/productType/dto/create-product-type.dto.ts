import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateProductTypeDto {
	@ApiProperty()
	@IsString()
		name: string

	@ApiProperty()
	@IsNumber()
		loss: number
}