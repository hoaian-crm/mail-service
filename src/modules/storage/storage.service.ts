import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import {
  IStorageController,
  PutFileResponse,
  ReadFile,
  ReadFileResponse,
} from 'src/prototypes/gen/ts/interfaces/storage';
import { observableHandler } from './../../prototypes/formatters/observable';

@Injectable()
export class StorageService implements OnModuleInit {
  private storageController: IStorageController;
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.STORAGE_GRPC,
      package: 'storage',
      protoPath: 'src/prototypes/interfaces/storage.proto',
      maxReceiveMessageLength: 1024 * 1024 * 1024,
      maxSendMessageLength: 1024 * 1024 * 1024,
    },
  })
  private client: ClientGrpc;
  constructor() {}
// 
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

  async readFile(request: ReadFile) {
    return observableHandler<ReadFileResponse>(
      await this.storageController.Read(request),
    );
  }

  async healthCheck() {
    return await this.storageController.HealthCheck({
      message: 'You are healthy',
    });
  }
}
