
import type { VercelRequest, VercelResponse } from '@vercel/node';
// Fix: Explicitly import Buffer to avoid global scope issues in TypeScript
import { Buffer } from 'buffer';
import clientPromise from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db('getwealthos');

    const user = await db.collection('users').findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }

    // In a real app, you would sign a JWT here. 
    // For this implementation, we return a simple secure-looking token.
    const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        balance: user.balance || 0
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
