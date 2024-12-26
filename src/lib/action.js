'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export const customRevalidateTag = (tag) => {
  revalidateTag(tag);
};
export const customRevalidatePath = (path) => {
  revalidatePath(path);
};
