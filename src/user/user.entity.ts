import * as argon2 from 'argon2';
import { Post } from 'src/post/post.entity';
import { Token } from 'src/token/token.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  avatarUrl!: string;

  @OneToMany((type) => Post, (post) => post.owner)
  @JoinTable()
  ownedPosts?: Post[];

  @ManyToMany((type) => Post)
  @JoinTable()
  postsLikes?: Post[];

  @OneToMany((type) => Token, (token) => token.owner)
  @JoinTable()
  tokens?: Token[];

  @Column({ name: 'password', nullable: false })
  private _password!: string;

  async setPassword(pass: string) {
    this._password = await argon2.hash(pass);
  }

  async getPassword(): Promise<string> {
    return this._password;
  }
}
