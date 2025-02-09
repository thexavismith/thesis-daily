import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Quote } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quote | { message: string }>
) {
  try {
    const quotesCount = await prisma.quote.count();
    const skip = Math.floor(Math.random() * quotesCount);
    const randomQuote = await prisma.quote.findFirst({
      skip,
      include: { author: true, source: true },
    });

    if (!randomQuote) {
      return res.status(404).json({ message: 'No quotes found' });
    }

    res.status(200).json(randomQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
