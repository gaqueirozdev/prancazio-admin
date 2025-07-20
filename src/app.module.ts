import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		UsersModule,
		// Carrega variáveis de ambiente de .env
		ConfigModule.forRoot({
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
			})
		}),
	]
})
export class AppModule {}
