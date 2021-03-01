import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  message!: string;

  @ManyToOne((type) => Post, (post) => post.mentionBy)
  mention?: Post;

  @OneToMany((type) => Post, (post) => post.mention)
  mentionBy?: Post[];

  @ManyToOne((type) => User, (user) => user.ownedPosts, { nullable: false })
  @JoinTable()
  owner!: User;
}
