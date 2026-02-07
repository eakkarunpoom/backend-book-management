import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  author: string;

  @Column({ name: 'published_year' })
  publishedYear: number;

  @Column()
  genre: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}