'use client';

import { ChangeEvent, useState } from 'react';

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onMediaSelected(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.item(0);
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
        onChange={onMediaSelected}
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="w-full aspect-video rounded-lg object-cover"
        />
      )}
    </>
  );
}
