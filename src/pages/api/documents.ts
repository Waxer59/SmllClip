import type { APIRoute } from 'astro'
import { databases, bucket } from 'src/appwrite'
import { Query, ID } from 'appwrite'

const DATABASE_ID = import.meta.env.APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.APPWRITE_DOCUMENTS_COLLECTION_ID
const BUCKET_ID = import.meta.env.APPWRITE_BUCKET_ID

export const GET: APIRoute = async ({ params }) => {
  if (!params.id) {
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)

    return new Response(JSON.stringify(documents), { status: 200 })
  }

  const document = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('id', [params.id])
  ])

  return new Response(JSON.stringify(document), { status: 200 })
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() // body: { type: string, content: string }

  const file = await bucket.createFile(
    BUCKET_ID,
    ID.unique(),
    new File([body.content], 'bucket.txt', { type: 'text/plain' })
  )

  const document = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    JSON.stringify({
      id: ID.unique(),
      type: body.type,
      document_id: file.$id
    })
  )

  console.log(document)

  return new Response(JSON.stringify(document), { status: 201 })
}

export const DELETE: APIRoute = async ({ params }) => {
  if (!params.id) return new Response('Missing document ID', { status: 400 })

  const document = await databases.getDocument(
    DATABASE_ID,
    COLLECTION_ID,
    params.id
  )

  await bucket.deleteFile(BUCKET_ID, document.document_id)
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, params.id)

  return new Response(
    JSON.stringify({ message: 'Document succesfully deleted!' }),
    { status: 200 }
  )
}
