import { Client, Databases, Storage } from 'node-appwrite'

const APPWRITE_API_KEY = import.meta.env.APPWRITE_API_KEY
const APPWRITE_ENDPOINT = import.meta.env.APPWRITE_ENDPOINT
const APPWRITE_API_PROJECT = import.meta.env.APPWRITE_PROJECT_ID

if (!APPWRITE_API_KEY || !APPWRITE_ENDPOINT || !APPWRITE_API_PROJECT) {
  throw new Error('Missing Appwrite API key, endpoint or project ID')
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_API_PROJECT)
  .setKey(APPWRITE_API_KEY)

export const databases = new Databases(client)
export const bucket = new Storage(client)
