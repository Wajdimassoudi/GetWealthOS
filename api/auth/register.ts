
import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { name, email, password, country } = req.body;
    const client = await clientPromise;
    const db = client.db('getwealthos');

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const result = await db.collection('users').insertOne({
      name,
      email,
      password, // In production, hash this with bcrypt
      country,
      createdAt: new Date(),
      balance: 0
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: result.insertedId, name, email, country }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
