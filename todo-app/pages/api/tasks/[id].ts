import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Geçersiz ID' })
  }

  if (req.method === 'PUT') {
    const { title, isDone } = req.body

    if (
      (title !== undefined && typeof title !== 'string') ||
      (isDone !== undefined && typeof isDone !== 'boolean')
    ) {
      return res.status(400).json({ error: 'Geçersiz veri' })
    }

    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...(title !== undefined ? { title } : {}),
          ...(isDone !== undefined ? { isDone } : {}),
        },
      })
      res.status(200).json(updatedTask)
    } catch (error) {
      console.error('Görev güncellenirken hata:', error)
      res.status(500).json({ error: 'Görev güncellenemedi' })
    }

  } else if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({
        where: { id },
      })
      res.status(204).end()
    } catch (error) {
      console.error('Görev silinirken hata:', error)
      res.status(500).json({ error: 'Görev silinemedi' })
    }

  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
