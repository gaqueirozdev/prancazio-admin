import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
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
}