import * as bcrypt from 'bcrypt'

export const encryptPassword = async (password, salt = 6) => await bcrypt.hash(password, salt)