import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export async function connectToDatabase() {
  try {
    await client.connect()
    return client.db('enoeka')
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}

export const collections = {
  newsletter: 'newsletter_subscribers',
  contacts: 'contact_submissions',
  consultations: 'consultation_bookings',
}

export async function insertDocument(collection: string, document: any) {
  try {
    const db = await connectToDatabase()
    const result = await db.collection(collection).insertOne({
      ...document,
      createdAt: new Date(),
    })
    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error }
  } finally {
    await client.close()
  }
} 