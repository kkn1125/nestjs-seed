import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export type ExtensionType = ReturnType<typeof prismaExtension>;

const prismaExtension = (client: PrismaClient) => {
  async function softDelete<
    Model,
    Args extends Prisma.Args<Model, 'delete' | 'deleteMany'>,
  >(this: Model, args?: Args) {
    const argsCopy = args ?? {};
    Object.assign(argsCopy, {
      data: { deletedAt: new Date() },
    });
    const context = Prisma.getExtensionContext(this) as any;
    const item = await context.update(argsCopy);
    return { item };
  }

  const extension = Prisma.defineExtension({
    name: 'customExtension',
    model: {
      $allModels: { softDelete },
    },
  });

  return client.$extends(extension);
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  _client!: ExtensionType;

  get client() {
    if (!this._client) this._client = prismaExtension(this);
    return this._client;
  }

  constructor() {
    super({
      log: ['query'],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
