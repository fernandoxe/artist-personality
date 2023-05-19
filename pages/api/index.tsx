// next api routes
import { getResponse } from '@/services/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if(method !== 'POST') return res.status(405).json({message: 'Method not allowed'});

  const { songs } = JSON.parse(req.body);
  const personality = await getResponse(songs);
  res.status(200).json({personality});
};
