import { Response } from 'express'
import * as winston from 'winston'

/* const file = new winston.transports.File({
  filename: '../logs/error.log',
  level: 'error',
  handleExceptions: true
}) */

export function unCoughtErrorHandler (
  err: any,
  res: Response
): void {
  winston.error(JSON.stringify(err))
  res.end({ error: err })
}

export function apiErrorHandler (
  err: any,
  res: Response,
  message: string
): void {
  const error: object = { Message: message, Stack: String(err) }
  res.status(500).json({ error })
}
