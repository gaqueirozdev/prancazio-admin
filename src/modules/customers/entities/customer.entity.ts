import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender } from '../enums/gender.enum'
import { CivilState } from '../enums/civil-state.enum'

@Entity('customers')
export class Customer {
	@PrimaryGeneratedColumn('uuid')
		id: string

	@Column()
		name: string

	@Column({ length: 11 })
		phone: string

	@Column({ nullable: true })
		email: string

	@Column({ nullable: true })
		zipCode: string

	@Column({ nullable: true })
		state: string

	@Column({ nullable: true })
		city: string

	@Column({ nullable: true })
		neighborhood: string

	@Column({ nullable: true })
		address: string

	@Column({ nullable: true })
		streetNumber: string

	@Column({ nullable: true })
		complement: string

	@Column({ type: 'enum', enum: Gender })
		gender: Gender

	@Column({ type: 'enum', enum: CivilState, nullable: true })
		civilState: CivilState

	@DeleteDateColumn({ nullable: true })
		deletedAt?: Date
	
	@Column({ type: 'uuid', nullable: true })
		deletedBy?: string
}