import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateProductDto {
	@ApiProperty()
	@IsUUID()
		id?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		productTypeId?: string
	
	@ApiProperty()
	@IsNumber()
	@IsOptional()
		weight?: number
		
	@ApiProperty()
	@IsString()
	@IsOptional()
		description?: string
	
	@ApiProperty()
	@IsNumber()	
	@IsOptional()
		value?: number

	@ApiProperty()
	@IsOptional()
	@IsNumber()
		usedAmountOfGold?: number

	@ApiProperty()
	@IsDateString()
	@IsOptional()
		cancelingDate?: string

	@ApiProperty()
	@IsUUID()
	@IsOptional()
		markedCanceledById?: string

	@ApiProperty()
	@IsUUID()
	@IsOptional()
		cancelingReasonId?: string
}