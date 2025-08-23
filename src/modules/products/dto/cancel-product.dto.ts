import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class CancelProductDto {
	@ApiProperty()
	@IsUUID()
		cancelingReasonId: string

	@ApiProperty()
	@IsUUID()
		markedCanceledById: string 
}