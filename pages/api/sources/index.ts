import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const sources = await prisma.source.findMany();
      return res.status(200).json(sources);
    } catch (error) {
      console.error('Database fetch error:', error);
      return res.status(500).json({ message: 'Failed to fetch sources' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
