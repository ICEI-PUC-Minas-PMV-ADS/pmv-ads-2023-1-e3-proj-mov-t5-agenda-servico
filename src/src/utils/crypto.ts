import bcrypt from 'bcryptjs';
import { APP_SALT } from '../constants/app';

export const hash = (password: string) => bcrypt.hashSync(password, APP_SALT);