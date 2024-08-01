import { column, defineDb, defineTable } from 'astro:db'
import { idGenerator } from '@utils/idGenerator'

const Source = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: idGenerator(), unique: true }),
    title: column.text({ default: 'Untitled' }),
    description: column.text({ default: 'No description' }),
    content: column.text(),
    language: column.text({ default: 'javascript' }),
    created_at: column.date({ default: new Date() }),
    views: column.number({ default: 0 })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Source }
})
