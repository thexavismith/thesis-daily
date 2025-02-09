import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  (global as any).prisma = (global as any).prisma || prisma;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, type, publishedAt, url } = req.body;
  
  if (!title || !type) {
    return res.status(400).json({ message: 'Title and Type are required.' });
  }

  if (publishedAt && isNaN(Date.parse(publishedAt))) {
    return res.status(400).json({ message: 'Invalid date format.' });
  }

  try {
    const source = await prisma.source.create({
      data: {
        title,
        type,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        url,
      },
    });
    return res.status(201).json(source);
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
