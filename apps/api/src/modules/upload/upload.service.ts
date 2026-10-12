import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IAuthUser } from '../auth/auth.types';
import { connectId } from '../../services/prisma/prisma.util';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(file: Express.Multer.File, user: IAuthUser) {
    const upload = await this.prisma.upload.create({
      data: {
        size: file.size,
        type: file.mimetype,
        data: new Uint8Array(file.buffer),
        name: file.originalname,
        user: connectId(user.sub),
      },
    });

    return {id: upload.id };
  }

  async getFile(id: string) {
    return await this.prisma.upload.findUnique({
      where: { id },
    });
  }

  async delete(ids: string[], user: IAuthUser) {
    const result = await this.prisma.upload.deleteMany({
      where: {
        id: { in: ids },
        userId: user.sub,
      },
    });
    return result;
  }
}
