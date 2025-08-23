import * as bcrypt from 'bcrypt'

export const password_encryptPassword = async (password, salt = 6) => await bcrypt.hash(password, salt)