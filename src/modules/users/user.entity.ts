import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}