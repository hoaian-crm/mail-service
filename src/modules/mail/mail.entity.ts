import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mails')
export class Mail {
  @PrimaryColumn()
  id: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  html: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
