
import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db('getwealthos');

  if (req.method === 'GET') {
    try {
      const type = req.query.type;
      const query = type ? { type } : {};
      const listings = await db.collection('listings').find(query).toArray();
      return res.status(200).json(listings);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const listing = req.body;
      const result = await db.collection('listings').insertOne({
        ...listing,
        createdAt: new Date()
      });
      return res.status(201).json({ id: result.insertedId, ...listing });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
