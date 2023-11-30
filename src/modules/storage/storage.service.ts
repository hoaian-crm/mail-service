import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import {
  IStorageController,
  PutFileResponse,
} from 'src/prototypes/gen/ts/interfaces/storage';
import { observableHandler } from './../../prototypes/formatters/observable';

@Injectable()
export class StorageService implements OnModuleInit {
  private storageController: IStorageController;
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'storage',
      protoPath: 'src/prototypes/interfaces/storage.proto',
    },
  })
  private client: ClientGrpc;
  constructor() {}

  async onModuleInit() {
    this.storageController =
      this.client.getService<IStorageController>('IStorageController');
  }

  async upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<PutFileResponse> {
    return observableHandler(
      await this.storageController.Put({
        content: file.buffer,
        destination: path,
        filename: file.originalname,
      }),
    );
  }

  async readFile() {}

  async healthCheck() {
    return await this.storageController.HealthCheck({
      message: 'You are healthy',
    });
  }
}
