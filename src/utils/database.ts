import { db, Source, eq } from 'astro:db'

export async function updateViews(id: string): Promise<void> {
  const source = await db.select().from(Source).where(eq(Source.id, id)).get()
  if (!source) return

  await db
    .update(Source)
    .set({ views: source.views + 1 })
    .where(eq(Source.id, id))
}
