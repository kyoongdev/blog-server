import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    this.softDeleteInterceptors();
  }

  async onModuleInit() {
    await this.$connect();
    this.$on<any>('query', (event: Prisma.QueryEvent) => {
      this.logger.log('Query: ' + event.query);
      this.logger.log('Duration: ' + event.duration + 'ms');
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async softDeleteInterceptors() {
    this.$use(async (params, next) => {
      const models = this.configService.get('SOFT_DELETE_MODELS')?.split(',') || [];
      models.forEach((model: string) => {
        if (params.model === model) {
          if (params.action === 'delete') {
            params.action = 'update';
            params.args['data'] = { deletedAt: new Date() };
          }
          if (params.action === 'deleteMany') {
            params.action = 'updateMany';
            if (params.args.data != undefined) {
              params.args.data = { deletedAt: new Date() };
            } else {
              params.args['data'] = { deletedAt: new Date() };
            }
          }
        }
      });

      return next(params);
    });
  }
}
