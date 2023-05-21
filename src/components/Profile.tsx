import { getUser } from '@/app/lib/jwt';
import Image from 'next/image';

export default function Profile() {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
        alt=""
      />
      <p className="text-sm leading-snug max-w-[140px]">{name}</p>
      <a
        href="/api/auth/logout"
        className="block text-red-400 hover:text-red-300"
      >
        Quero Sair
      </a>
    </div>
  );
}