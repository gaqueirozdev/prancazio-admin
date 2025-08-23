import { IsOptional } from 'class-validator'
import { Order } from 'src/modules/orders/entities/order.entity'
import { ProductType } from 'src/modules/productType/entities/product-type.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('products')
export class Product {
	@PrimaryGeneratedColumn('uuid')
		id: string

	//Vários produtos podem ter o mesmo tipo
	//Uma vez criado, devido ao fato de que usamos softDelete, isso não pode ser NULL, nem mesmo quando fizermos o softDelete
	@ManyToOne(() => ProductType, { eager: true })
	@JoinColumn({ name: 'productTypeId' })
		productType: ProductType

	@Column({ type: 'uuid' }) 
	@RelationId((product: Product) => product.productType)
		productTypeId: string

	//Vários produtos podem ter a mesma venda
	//Uma vez criado, devido ao fato de que usamos softDelete, isso não pode ser NULL, nem mesmo quando fizermos o softDelete
	@ManyToOne(() => Order, order => order.products )
	@JoinColumn({ name: 'orderId' })
		order: Order

	@Column({ type: 'uuid', nullable: true })
	@RelationId((product: Product) => product.order)
		orderId: string

	@Column({ type: 'float' })
		weight: number

	@Column({ type: 'float', nullable: true })
	@IsOptional()
		usedAmountOfGold?: number
	
	@Column({ type: 'text' })
		description: string

	@Column({ type: 'float' })	
		value: number

	//YYYY-MM-DD HH:MM:SS
	@Column({ type: 'timestamp', nullable: true })
		cancelingDate?: Date

	@Column({ type: 'uuid', nullable: true })
		markedCanceledById?: string

	@Column({ type: 'uuid', nullable: true })
		cancelingReasonId?: string

	@Column({ nullable: true })
		imageUrl?: string
}
