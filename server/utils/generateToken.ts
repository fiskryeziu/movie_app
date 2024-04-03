import jwt from 'jsonwebtoken'
import { TUser } from '../types'


export default function generateToken(user: TUser) {
    return jwt.sign(user, 'secret1234', { expiresIn: '10d' })
}