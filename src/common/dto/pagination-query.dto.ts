import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class PaginationQueryDto {
	@ApiProperty({ default: 1 })
	@IsOptional()
	@IsNumberString()
		page?: string 

	@ApiProperty({ default: 10 })
	@IsOptional()
	@IsNumberString()
		limit?: string
}