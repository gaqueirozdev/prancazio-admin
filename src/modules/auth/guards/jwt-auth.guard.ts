import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (isPublic) return true

		// faz exatamente o fluxo do JWT
		/**
		  Extrai o token JWT do Authorization (Bearer token).

			Valida o token com a JwtStrategy que você criou.

			Se for válido, injeta o usuário (req.user) dentro do request da requisição.

			Se for inválido ou ausente, lança erro 401 (Unauthorized).
		*/
		return super.canActivate(context) // Aqui chama o AuthGuard original
	}

}