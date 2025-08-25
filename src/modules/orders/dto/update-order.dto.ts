import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto'

export class UpdateOrderDto {
	@ApiProperty({ type: String, format: 'date' })
	@IsDateString()
		dueDate?: string

	@ApiProperty()
	@IsString()
		paymentMethod?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		observation?: string

	@ApiProperty()
	@IsNumber()
		value?: number

	@ApiProperty()
	@IsString()
	@IsOptional()
		saleIdentifier?: string

	@ApiProperty({ type: [UpdateProductDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateProductDto)
		products?: UpdateProductDto[]
}