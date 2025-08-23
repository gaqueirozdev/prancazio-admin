import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto'

export class CreateOrderDto {
	@ApiProperty({ type: String, format: 'date' })
	@IsDateString()
		dueDate: string

	@ApiProperty()
	@IsUUID()
		customerId: string

	@ApiProperty()
	@IsString()
		paymentMethod: string

	@ApiProperty()
	@IsString()
	@IsOptional()
		observation?: string

	@ApiProperty()
	@IsNumber()
		value: number

	@ApiProperty({ type: [CreateProductDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateProductDto)
		products: CreateProductDto[]
}