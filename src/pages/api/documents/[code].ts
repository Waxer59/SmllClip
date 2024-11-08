import type { APIRoute } from 'astro'
import { databases, bucket } from 'src/appwrite'
import { Query } from 'node-appwrite'
import { DocumentType } from '@constants'
import {
  AppwriteBuckets,
  AppwriteCollections,
  AppwriteDatabases
} from 'src/types'
import { arrayBufferToString } from '@helpers/arrayBufferToString'

export const GET: APIRoute = async ({ params }) => {
  const { code } = params
  console.log(code)
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
