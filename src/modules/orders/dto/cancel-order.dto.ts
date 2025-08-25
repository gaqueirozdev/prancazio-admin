import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsUUID } from 'class-validator'

export class CancelOrderDto {
	@ApiProperty({ type: 'string' })
	@IsUUID()
		cancelingReason: string

	@ApiProperty({ type: 'string' })
	@IsUUID()
		markedCanceledBy: string

	@ApiProperty({ type: 'string' })
	@IsDateString()
		cancelingDate: Date

}