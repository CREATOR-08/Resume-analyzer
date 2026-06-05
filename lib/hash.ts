import { randomBytes, pbkdf2Sync } from 'crypto'

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derived = pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
  return `${salt}:${derived}`
}

export function verifyPassword(password: string, stored: string) {
  if (!stored) return false
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
  return derived === hash
}
