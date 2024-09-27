import type { APIRoute } from 'astro'
import { databases, bucket } from 'src/appwrite'
import { Query, ID } from 'node-appwrite'
import { nanoid } from 'nanoid'
import { DocumentType, LANGUAGES, THEMES } from '@constants'
import {
  AppwriteBuckets,
  AppwriteCollections,
  AppwriteDatabases
} from 'src/types'
import { z } from 'astro:content'
import { SHORT_ID_INITIAL_LENGTH, SHORT_ID_MAX_LENGTH } from '@constants'
import { arrayBufferToString } from '@helpers/arrayBufferToString'

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

export const GET: APIRoute = async ({ url }) => {
  const urlObject = new URL(url)
  const code = urlObject.searchParams.get('code')

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  const document = await databases.listDocuments(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    [Query.equal('code', [code])]
  )

  if (document.total === 0) {
    return new Response(null, { status: 404 })
  }

  const { theme, language, type, document_id } = document.documents[0]

  const contentBuff = await bucket.getFileView(
    AppwriteBuckets.documents,
    document_id
  )
  const content = arrayBufferToString(contentBuff)
  const codeTypeData = type === DocumentType.code ? { theme, language } : {}

  const response = {
    type,
    ...codeTypeData,
    content
  }

  return new Response(JSON.stringify(response), { status: 200 })
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
