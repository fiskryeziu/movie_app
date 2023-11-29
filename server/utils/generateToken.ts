import jwt from 'jsonwebtoken'

export default function generateToken(id: string) {
    return jwt.sign({ id }, 'secret1234', { expiresIn: '10d' })
}