import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  author: string;

  @Column({ name: 'published_year' })
  publishedYear: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  genre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  create_by: string

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}