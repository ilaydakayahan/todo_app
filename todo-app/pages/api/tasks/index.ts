import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      })
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ error: 'Görevler alınamadı.' })
    }
  } else if (req.method === 'POST') {
    const { title } = req.body
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Geçersiz başlık.' })
    }
    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          isDone: false,
        },
      })
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ error: 'Görev oluşturulamadı.' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
