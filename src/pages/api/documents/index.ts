import {
  DocumentType,
  LANGUAGES,
  SHORT_ID_INITIAL_LENGTH,
  SHORT_ID_MAX_LENGTH,
  THEMES
} from '@constants'
import type { APIRoute } from 'astro'
import { Query, ID } from 'node-appwrite'
import { z } from 'zod'
import { bucket, databases } from 'src/appwrite'
import {
  AppwriteBuckets,
  AppwriteDatabases,
  AppwriteCollections
} from 'src/types'
import { nanoid } from 'nanoid'

const FRONTEND_URL = import.meta.env.FRONTEND_URL

const linkRequestSchema = z.object({
  content: z.string().trim().min(1),
  type: z.enum(['code', 'document'])
})

const languagesArray = LANGUAGES.map((language) => language.value) as [
  string,
  ...string[]
]
const themesArray = THEMES.map((theme) => theme.value) as [string, ...string[]]

const codeDocumentSchema = linkRequestSchema.extend({
  language: z.enum(languagesArray),
  theme: z.enum(themesArray)
})

const getUniqueShortId = async (
  length = SHORT_ID_INITIAL_LENGTH
): Promise<string | null> => {
  const shortId = nanoid(length)
  const document = await databases.listDocuments(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    [Query.equal('code', shortId)]
  )

  if (length > SHORT_ID_MAX_LENGTH) {
    return null
  }

  if (document.total === 0) {
    return shortId
  }

  return getUniqueShortId(length + 1)
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  let parsedBody

  if (body.type === DocumentType.code) {
    parsedBody = codeDocumentSchema.safeParse(body)
  } else {
    parsedBody = linkRequestSchema.safeParse(body)
  }

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), { status: 400 })
  }

  const code = await getUniqueShortId()

  if (!code) {
    return new Response('Failed to generate unique short ID', { status: 500 })
  }

  const documentId = ID.unique()

  const file = await bucket.createFile(
    AppwriteBuckets.documents,
    documentId,
    new File([body.content], documentId, { type: 'text/plain' })
  )

  const codeTypeData =
    parsedBody.data.type === DocumentType.code
      ? // @ts-expect-error If the type is not code, the theme and language will be undefined
        { theme: parsedBody.data.theme, language: parsedBody.data.language }
      : {}

  const document = await databases.createDocument(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    ID.unique(),
    JSON.stringify({
      code,
      type: parsedBody.data.type,
      document_id: file.$id,
      ...codeTypeData
    })
  )

  return new Response(
    JSON.stringify({
      url: `${FRONTEND_URL}/${document.code}`
    }),
    { status: 201 }
  )
}
