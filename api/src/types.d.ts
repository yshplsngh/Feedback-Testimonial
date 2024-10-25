import { User as userSchema } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends userSchema {}
  }
}
