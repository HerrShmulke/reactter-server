import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostAddInput } from 'src/graphql';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(relations: string[] = []): Promise<Post[]> {
    return this.postRepository.find({
      relations: relations,
    });
  }

  findById(id: number, relations: string[] = []): Promise<Post> {
    return this.postRepository.findOne(id, {
      relations: relations,
    });
  }

  async addLike(userId: number, postId: number): Promise<void> {
    const post = await this.postRepository.findOne(postId);
    const owner = await this.userRepository.findOne(userId);

    if (owner.postsLikes) owner.postsLikes.push(post);
    else owner.postsLikes = [post];

    this.userRepository.save(owner);
  }

  async add(post: PostAddInput): Promise<Post> {
    const newPost: Post = this.postRepository.create();

    newPost.message = post.message;
    newPost.owner = await this.userRepository.findOne(post.ownerId);

    if (post.mention)
      newPost.mention = await this.postRepository.findOne(post.mention);

    return this.postRepository.save(newPost);
  }
}
