import { Test, TestingModule } from '@nestjs/testing'
import { CustomersUseCase } from './customers.use-case'


describe('CustomersUseCase', () => {
	let service: CustomersUseCase

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CustomersUseCase],
		}).compile()

		service = module.get<CustomersUseCase>(CustomersUseCase)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
