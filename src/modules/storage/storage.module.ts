import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientPackages } from 'src/config/constants';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
  imports: [
    ClientsModule.register([
      {
        name: ClientPackages.Storage,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'storage',
          protoPath: 'src/prototypes/interfaces/storage.proto',
        },
      },
    ]),
  ],
})
export class StorageModule {}
