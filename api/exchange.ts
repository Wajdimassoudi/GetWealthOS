
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const base = req.query.base || 'USD';
  const key = process.env.EXCHANGERATE_KEY || 'a06a5496ee0d90cef5bcb62924325393';

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/${base}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch rates' });
  }
}
