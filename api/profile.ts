
import type { VercelRequest, VercelResponse } from '@vercel/node';
// Fix: Explicitly import Buffer to resolve the 'Cannot find name Buffer' error
import { Buffer } from 'buffer';
import clientPromise from './lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  try {
    const token = authHeader.split(' ')[1];
    const decodedId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const client = await clientPromise;
    const db = client.db('getwealthos');
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(decodedId) });
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      country: user.country,
      balance: user.balance || 0
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching profile' });
  }
}
