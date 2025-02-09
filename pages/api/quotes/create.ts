import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { text, author_id, source_id } = req.body;

    try {
      const quote = await prisma.quote.create({
        data: {
          text,
          author_id: parseInt(author_id),
          source_id: source_id ? parseInt(source_id) : undefined,
        },
      });
      res.status(201).json(quote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
