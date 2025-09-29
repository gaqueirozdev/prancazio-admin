import { IsOptional } from 'class-validator'
import { Customer } from 'src/modules/customers/entities/customer.entity'
import { Product } from 'src/modules/products/entities/product.entity'
import { 
	Column, 
	CreateDateColumn, 
	DeleteDateColumn, 
	Entity, 
	JoinColumn, 
	ManyToOne, 
	OneToMany, 
	PrimaryGeneratedColumn, 
	RelationId, 
	UpdateDateColumn 
} from 'typeorm'

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
		id: string	

	@Column({ unique: true, comment: 'Only set after payment, so the order turns into a sale', nullable: true })
	@IsOptional()	
		saleIdentifier?: string

	@Column({ type: 'float' })
		value: number

	@Column({ type: 'date' })
		dueDate: Date

	@Column({ nullable: true })
		observation?: string

	// Várias vendas podem ter o mesmo cliente -> ManyToOne
	// Um cliente pode ter várias vendas -> OneToMany	
	@ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'customerId' })
		customer?: Customer

	@Column({ type: 'uuid', nullable: true })
	@RelationId((order: Order) => order.customer)
		customerId?: string

	// Uma venda pode ter o vários produtos -> OneToMany
	// Vários produtos podem ter a mesma venda -> ManyToOne	
	// O lado OneToMany apenas aponta para a propriedade que referencia a venda no Product
	// eager: true / lazy: true traz o relacionamento direto no find da entidade ou não.
	// sem eager, para buscar o relacionamento será necessário fazer um queryBuilder ou um find a mais. 
	/**
	 * Find manual com QueryBuilder
	 		const order = await orderRepository.findOne({
				where: { id: orderId },
				relations: ['products', 'customer'], // inclua os relacionamentos que quiser
			});
	 */
	@OneToMany(() => Product, product => product.order, { cascade: true })
		products: Product[]	
	
	@Column()
		paymentMethod: string

	@Column({ type: 'timestamp', nullable: true })
		paymentDate?: Date

	@Column({ type: 'timestamp', nullable: true })
		cancelingDate?: Date

	@Column({ type: 'uuid', nullable: true })
		markedCanceledBy?: string

	@Column({ nullable: true })
		cancelingReason?: string

	@CreateDateColumn()
	@IsOptional()
		createdAt?: Date

	@UpdateDateColumn()
	@IsOptional()
		updatedAt?: Date

	@DeleteDateColumn({ nullable: true })
	@IsOptional()
		deletedAt?: Date

	@Column({ nullable: true })
	@IsOptional()
		deletedBy?: string
}