import { Customer } from 'src/modules/customers/entities/customer.entity'
import { ProductType } from 'src/modules/productType/entities/product-type.entity'
import { 
	Column, 
	CreateDateColumn, 
	Entity, 
	JoinColumn, 
	ManyToOne, 
	OneToOne, 
	PrimaryGeneratedColumn, 
	RelationId, 
	UpdateDateColumn 
} from 'typeorm'

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
		id: string	

	@Column({ unique: true })
		saleIdentifier: string
	
	@OneToOne(() => ProductType, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'productTypeId' })
		productType: ProductType

	@RelationId((order: Order) => order.productType)
		productTypeId: string

	@Column({ type: 'date' })
		dueDate: Date

	@Column({ type: 'decimal', precision: 10, scale: 2 })
		weight: number

	@Column({ type: 'text' })
		description: string

	// Várias vendas podem ter o mesmo cliente -> ManyToOne
	// Um cliente pode ter várias vendas -> OneToMany	
	@ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'customerId' })
		customer: Customer

	@RelationId((order: Order) => order.customer)
		customerId: string
	
	@Column({ type: 'decimal', precision: 10, scale: 2 })	
		value: number

	@Column()
		paymentMethod: string

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}