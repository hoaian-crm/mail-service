import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3Path } from 'src/prototypes/constants/s3';

@Injectable()
export class S3Service {
  private client: S3;

  constructor() {}

  async onModuleInit() {
    this.client = new S3({
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      },
    });
  }

  async uploadFile(bucket: S3Path) {
    return this.client.upload({
      ACL: 'public-read',
      Bucket: 'dev',
      Key: '123123'
    });
  }
}
