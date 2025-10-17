import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { CustomersModule } from './modules/customers/customers.module'
import { ProductTypesModule } from './modules/productType/product-types.module'
import { OrdersModule } from './modules/orders/orders.module'
import { ProductsModule } from './modules/products/products.module'
import { PurchasesModule } from './modules/purchases/purchase.module'
import { VendorsModule } from './modules/vendor/vendor.module'

@Module({
	imports: [
		UsersModule,
		AuthModule,
		CustomersModule,
		ProductTypesModule,
		OrdersModule,
		ProductsModule,
		PurchasesModule,
		VendorsModule,

		ConfigModule.forRoot({// Carrega variáveis de ambiente de .env
			isGlobal: true, // Torna acessível em toda a aplicação
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: config => ({
				type: 'mariadb',
				host: config.get('DB_HOST'),
				port: config.get('DB_PORT'),
				username: config.get('DB_USERNAME'),
				password: config.get('DB_PASSWORD'),
				database: config.get('DB_DATABASE'),
				entities: [__dirname + '/**/*.entity.{ts,js}'],
				synchronize: true,
				logging: true
			})
		}),
	]
})
export class AppModule {}
