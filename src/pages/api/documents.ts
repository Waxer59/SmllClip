import type { APIRoute } from 'astro'
import { databases, bucket } from 'src/appwrite'
import { Query, ID } from 'node-appwrite'
import { nanoid } from 'nanoid'
import {
  AppwriteBuckets,
  AppwriteCollections,
  AppwriteDatabases
} from 'src/types'
import { z } from 'astro:content'
import { SHORT_ID_INITIAL_LENGTH, SHORT_ID_MAX_LENGTH } from '@constants'

const FRONTEND_URL = import.meta.env.FRONTEND_URL

const linkRequestSchema = z.object({
  content: z.string().trim().min(1),
  type: z.enum(['code', 'document'])
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

export const GET: APIRoute = async ({ params }) => {
  const code = params.code

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  const document = await databases.listDocuments(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    [Query.equal('code', [code])]
  )

  return new Response(JSON.stringify(document), { status: 200 })
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  const parsedBody = linkRequestSchema.safeParse(body)

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
    new File([body.content], `${documentId}.txt`, { type: 'text/plain' })
  )

  const document = await databases.createDocument(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    ID.unique(),
    JSON.stringify({
      code,
      type: parsedBody.data.type,
      document_id: file.$id
    })
  )

  return new Response(
    JSON.stringify({
      url: `${FRONTEND_URL}/${document.code}`
    }),
    { status: 201 }
  )
}
