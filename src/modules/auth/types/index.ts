import { z } from 'zod';
import { Request } from 'express';

const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

const SIGNUP_SCHEMA = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(1),
});

interface AuthRequest extends Request {
  user: {
    id: number;
  };
}

type SIGNUP_SCHEMA_TYPE = z.infer<typeof SIGNUP_SCHEMA>;
type LOGIN_SCHEMA_TYPE = z.infer<typeof LOGIN_SCHEMA>;

export { SIGNUP_SCHEMA, LOGIN_SCHEMA, AuthRequest };
export type { SIGNUP_SCHEMA_TYPE, LOGIN_SCHEMA_TYPE };
