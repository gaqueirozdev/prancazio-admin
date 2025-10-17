import { IsOptional } from 'class-validator'
import { Purchase } from 'src/modules/purchases/entities/purchase.entity'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('vendors')
export class Vendor {
	@PrimaryGeneratedColumn('uuid')
		id: string

	@Column()
		name: string

	@Column()
		phone: string

	@Column({ nullable: true })
	@IsOptional()
		email?: string

	@Column({ nullable: true })
	@IsOptional()
		streetName?: string

	@Column({ nullable: true })
	@IsOptional()
		streetNumber?: string
	
	@Column({ nullable: true })
	@IsOptional()
		neighborhood?: string

	@Column({ nullable: true })
	@IsOptional()
		cityName?: string

	@OneToMany(() => Purchase, purchase => purchase.vendor)
		purchases: Purchase[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}