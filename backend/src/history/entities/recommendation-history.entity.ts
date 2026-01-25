import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('recommendation_history')
export class RecommendationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recommendationHistories, {
    lazy: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  city: string;

  @Column()
  weatherCondition: string;

  @Column({ type: 'double', nullable: true })
  temperature: number;

  @Column()
  musicGenre: string;

  @CreateDateColumn()
  recommendedAt: Date;
}
