import { hash, compare } from 'bcryptjs'

export function hashPassword(password: string): Promise<string> {
    return hash(password, 10)
}

export function vefifyPassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
}