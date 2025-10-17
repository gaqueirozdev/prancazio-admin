import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateVendorDto {
	@ApiProperty({ type: String }) //Esse cara marca no Swagger que o DTO recebe um name String
	@IsString() //Esse cara valida quando receber o Dto se de fato é uma string
		name: string

	@ApiProperty({ type: String })
	@IsString()
		phone: string

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
		email?: string

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
		streetName?: string

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
		streetNumber?: string

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
		neighborhood?: string

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
		cityName?: string
}