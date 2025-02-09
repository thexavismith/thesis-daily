import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
});

// Middleware to handle multipart/form-data
const uploadMiddleware = upload.single('image');

// Helper function to run the middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Run the multer middleware to process the file upload
      await runMiddleware(req, res, uploadMiddleware);

      // Extract form data
      const { name, bio } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Save the author data to the database
      const author = await prisma.author.create({
        data: {
          name,
          bio,
          image_url,
        },
      });

      res.status(201).json(author);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Disable Next.js's default body parser to allow multer to handle the request
export const config = {
  api: {
    bodyParser: false,
  },
};
