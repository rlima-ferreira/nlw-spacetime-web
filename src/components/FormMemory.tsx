'use client';

import { api } from '@/app/lib/api';
import Cookies from 'js-cookie';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import MediaPicker from './MediaPicker';

export default function FormMemory() {
  const router = useRouter();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const fileToUpload = formData.get('coverUrl');
    let coverUrl = '';
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set('file', fileToUpload as File);
      const {
        data: { fileUrl },
      } = await api.post('/upload', uploadFormData);
      coverUrl = fileUrl;
    }
    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    router.push('/');
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="uppercase inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black hover:bg-green-600 self-end"
      >
        Salvar
      </button>
    </form>
  );
}
