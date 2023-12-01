import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('jsonb')
  context: object;

  content: string | Buffer | Uint8Array;
}
