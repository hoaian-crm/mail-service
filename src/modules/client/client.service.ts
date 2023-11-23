import { Injectable } from '@nestjs/common';
import { Channel, Connection, connect } from 'amqplib/callback_api';

@Injectable()
export class ClientService {
  connection: Connection;
  channel: Channel;
  constructor() {}

  async connect(): Promise<Connection> {
    return new Promise((resolve) => {
      connect(process.env.AMQP_LINK, (err, connection) => {
        if (err) throw err;
        resolve(connection);
      });
    });
  }

  async createChannel(): Promise<Channel> {
    return new Promise((resolve) => {
      this.connection.createChannel((err, channel) => {
        if (err) throw err;
        resolve(channel);
      });

      this.connection.on('error', function (error) {
        console.error(error);
      });
    });
  }

  async addListener<T>(queueName: string, callback: (e: T) => void) {
    this.channel.consume(
      queueName,
      (data) => {
        callback(JSON.parse(data.content.toString()));
      },
      { noAck: true },
    );
  }

  async onModuleInit() {
    this.connection = await this.connect(); // NOTE: call this first
    this.channel = await this.createChannel();
  }
}
