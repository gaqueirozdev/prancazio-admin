import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserRoles } from '../enums/role.enum'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
		id: string

	@Column()
		name: string

	@Column({ unique: true })
		email: string

	@Column()
		password: string

	//Alterar para SELLER em algum momento futuro
	@Column({ type: 'enum', enum: UserRoles, default: UserRoles.ADMIN })
		role: UserRoles

	@Column({ default: true })
		isActive: boolean

	@DeleteDateColumn({ nullable: true })
		deletedAt?: Date

	@Column({ type: 'uuid', nullable: true })
		deletedBy?: string

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}