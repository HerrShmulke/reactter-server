
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PostAddInput {
    message: string;
    ownerId: number;
    mention?: number;
}

export class UserRegisterInput {
    name: string;
    password: string;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract addPost(postAddInput?: PostAddInput): boolean | Promise<boolean>;

    abstract addLike(postId: string, userId: string): boolean | Promise<boolean>;

    abstract registerUser(userRegisterInput?: UserRegisterInput): boolean | Promise<boolean>;

    abstract userLogin(name?: string, password?: string): boolean | Promise<boolean>;
}

export class Post {
    id: string;
    message: string;
    owner: User;
    mention?: Post;
    mentionBy?: Post[];
}

export class User {
    id: string;
    name: string;
    ownedPosts?: Post[];
}
