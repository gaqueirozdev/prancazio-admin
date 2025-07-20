import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserRoles } from '../enums/role.enum'

export class RolesGuard implements CanActivate {
	constructor (private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!requiredRoles) return true // rota pública ou sem roles

		const { user } = context.switchToHttp().getRequest()

		return requiredRoles.includes(user.role)
	}
}