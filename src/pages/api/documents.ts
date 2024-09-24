import type { APIRoute } from 'astro'
import { databases, bucket } from 'src/appwrite'
import { Query, ID } from 'appwrite'
import {
  AppwriteBuckets,
  AppwriteCollections,
  AppwriteDatabases
} from 'src/types'

export const GET: APIRoute = async ({ params }) => {
  if (!params.id) {
    const documents = await databases.listDocuments(
      AppwriteDatabases.shared_documents,
      AppwriteCollections.documents
    )

    return new Response(JSON.stringify(documents), { status: 200 })
  }

  const document = await databases.listDocuments(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    [Query.equal('id', [params.id])]
  )

  return new Response(JSON.stringify(document), { status: 200 })
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() // body: { type: string, content: string }

  const file = await bucket.createFile(
    AppwriteBuckets.documents,
    ID.unique(),
    new File([body.content], 'bucket.txt', { type: 'text/plain' })
  )

  const document = await databases.createDocument(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    ID.unique(),
    JSON.stringify({
      code: ID.unique(), // TODO: generate random code
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
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    params.id
  )

  await bucket.deleteFile(AppwriteBuckets.documents, document.document_id)
  await databases.deleteDocument(
    AppwriteDatabases.shared_documents,
    AppwriteCollections.documents,
    params.id
  )

  return new Response(
    JSON.stringify({ message: 'Document succesfully deleted!' }),
    { status: 200 }
  )
}
