import { openDB } from 'idb';

const DB_NAME = 'photoGalleryDB';
const STORE_NAME = 'images';

export async function getAllImages(): Promise<string[]> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const all = await store.getAll();
  return all.map((item: any) => item.data);
}

export async function addImage(data: string) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add({ data });
  await tx.done;
}

export async function removeImageByIndex(index: number) {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const all = await store.getAll();
  if (all[index]) {
    await store.delete(all[index].id);
  }
  await tx.done;
}

export async function clearAllImages() {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
}
