import { IsOptional } from 'class-validator'
import { Vendor } from 'src/modules/vendor/entities/vendor.entity'
import { 
	Column, 
	CreateDateColumn, 
	Entity, 
	JoinColumn, 
	ManyToOne, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn 
} from 'typeorm'

@Entity('purchases')
export class Purchase {
	@PrimaryGeneratedColumn('uuid')
		id: string
	
	@Column({ type: 'date' })
		date: string

	@Column({ type: 'decimal', precision: 10, scale: 2 })
		valueByGram: number

	@Column({ type: 'decimal', precision: 10, scale: 2 })
		total: number

	@Column({ type: 'decimal', scale: 2 })
		quantity: number

	@ManyToOne(() => Vendor, vendor => vendor.purchases, { onDelete: 'SET NULL', eager: true })
	@JoinColumn({ name: 'vendorId' })
		vendor: Vendor

	@Column({ nullable: true }) //Pode ser null por conta do SOFT DELETE
	@IsOptional()
		vendorId?: string

	@Column({ nullable: true })
	@IsOptional()
		deletedBy?: string

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}
