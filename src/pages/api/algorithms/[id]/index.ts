import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { algorithmValidationSchema } from 'validationSchema/algorithms';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.algorithm
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAlgorithmById();
    case 'PUT':
      return updateAlgorithmById();
    case 'DELETE':
      return deleteAlgorithmById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAlgorithmById() {
    const data = await prisma.algorithm.findFirst(convertQueryToPrismaUtil(req.query, 'algorithm'));
    return res.status(200).json(data);
  }

  async function updateAlgorithmById() {
    await algorithmValidationSchema.validate(req.body);
    const data = await prisma.algorithm.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAlgorithmById() {
    const data = await prisma.algorithm.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
