import { Client, Databases, Storage } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)

export const databases = new Databases(client)
export const bucket = new Storage(client)
