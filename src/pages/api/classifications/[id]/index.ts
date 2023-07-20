import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { classificationValidationSchema } from 'validationSchema/classifications';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.classification
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getClassificationById();
    case 'PUT':
      return updateClassificationById();
    case 'DELETE':
      return deleteClassificationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClassificationById() {
    const data = await prisma.classification.findFirst(convertQueryToPrismaUtil(req.query, 'classification'));
    return res.status(200).json(data);
  }

  async function updateClassificationById() {
    await classificationValidationSchema.validate(req.body);
    const data = await prisma.classification.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteClassificationById() {
    const data = await prisma.classification.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
