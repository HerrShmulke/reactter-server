import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, length: 3000 })
  accessToken!: string;

  @Column({ length: 36, nullable: false })
  refreshToken!: string;

  @ManyToOne((type) => User, (user) => user.tokens, { nullable: false })
  owner!: User;
}
