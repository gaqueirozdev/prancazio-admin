import { IsOptional } from 'class-validator'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_types')
export class ProductType {
	@PrimaryGeneratedColumn('uuid')
		id: string

	@Column({ type: 'decimal', precision: 10, scale: 2 })
		loss: number

	@Column({ unique: true })
		name: string

	@DeleteDateColumn({ nullable: true })
	@IsOptional()
		deletedAt?: Date

	@Column({ nullable: true })
	@IsOptional()
		deletedBy?: string

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}