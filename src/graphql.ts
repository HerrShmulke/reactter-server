
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PostAddLikeInput {
    postId: number;
    userId: number;
}

export class PostCreateInput {
    message: string;
    mention?: number;
}

export class UserRegisterInput {
    name: string;
    password: string;
}

export class UserLoginInput {
    name: string;
    password: string;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;

    abstract user(): User | Promise<User>;
}

export abstract class IMutation {
    abstract postCreate(input?: PostCreateInput): boolean | Promise<boolean>;

    abstract postAddLike(input?: PostAddLikeInput): boolean | Promise<boolean>;

    abstract userRegister(input: UserRegisterInput): boolean | Promise<boolean>;

    abstract userLogin(input: UserLoginInput): boolean | Promise<boolean>;

    abstract killAllSessions(): boolean | Promise<boolean>;
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
