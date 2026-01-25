import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('search_history')
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.searchHistories, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  city: string;

  @Column({ length: 2, nullable: true })
  countryCode: string;

  @CreateDateColumn()
  searchedAt: Date;
}
