import * as datefns from 'date-fns'
import { ptBR } from 'date-fns/locale'

  
/**
 * Formats date to brazilian format -> DD/MM/YYYY
 * @param param1 @date
 * @param param2 @type
 * @returns string
 */
export function date_format({ date, type = 'date' }: { date: Date | number, type?: 'date' | 'datetime' }): string {
	const format = type === 'date' ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm:ss' 
	
	return datefns.format(date, format, { locale: ptBR })
}

/**
 * Add days to date
 * @param param1 @date
 * @param param2 @type
 * @returns Date
 */
export function date_addDays({ date, days }: { date: Date, days: number }): Date {
	return datefns.addDays(date, days)
}

/**
 * Sub days from date
 * @param param1 @date
 * @param param2 @days 
 * @returns 
 */
export function date_subDays({ date, days }: { date: Date, days: number }): Date {
	return datefns.subDays(date, days)
}

/**
 * Adiciona horas a uma data
 */
export function date_addHours({ date, hours }: { date: Date, hours: number }): Date {
	return datefns.addHours(date, hours)
}

/**
 * Subtrai horas de uma data
 */
export function date_subHours({ date, hours }: { date: Date, hours: number }): Date {
	return datefns.subHours(date, hours)
}

/**
 * Diferença em dias entre duas datas
 */
export function date_differenceInDays({ 
	laterDate, 
	earlierDate, 
	compareDaysOnly 
}: { 
	laterDate: Date, 
	earlierDate: Date, 
	compareDaysOnly: boolean 
}): number {
	if (compareDaysOnly) {
		laterDate = datefns.startOfDay(laterDate)
		earlierDate = datefns.startOfDay(earlierDate)
	}

	return datefns.differenceInDays(laterDate, earlierDate)
}

/**
 * Diferença em horas entre duas datas
 */
export function date_differenceInHours({ laterDate, earlierDate }: { laterDate: Date, earlierDate: Date }): number {
	return datefns.differenceInHours(laterDate, earlierDate)
}

/**
 * Converte string ISO para Date
 */
export function date_parseISO(dateString: string): Date {
	return datefns.parseISO(dateString)
}

