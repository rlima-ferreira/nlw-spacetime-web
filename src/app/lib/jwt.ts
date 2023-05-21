import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';

interface IAuth {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): IAuth {
  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('Unauthenticated');
  }

  const user: IAuth = jwtDecode(token);

  return user;
}
