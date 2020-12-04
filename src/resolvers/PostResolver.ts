import {
	Resolver,
	Query,
	Mutation,
	Args,
	Field,
	ArgsType,
	Arg,
} from 'type-graphql';

import { Post } from '../entity/Post';

@ArgsType()
class PostArgs {
	@Field()
	title: string;
	@Field()
	body: string;
	@Field({ nullable: true })
	image?: string;
}

@Resolver()
export class PostResolver {
	@Mutation(() => Post)
	async createPost(@Args() { title, body, image }: PostArgs): Promise<Post> {
		const post = Post.create({ title, body, image });
		return await post.save();
	}

	@Mutation(() => Post)
	async updateWithId(
		@Arg('id') id: string,
		@Args() { title, body, image }: PostArgs
	): Promise<Post | null> {
		const post = await Post.findOne(id);
		if (post) {
			post.title = title;
			post.body = body;
			if (image) {
				post.image = image;
			}

			await Post.update(id, post);
			return post;
		}
		return null;
	}

	@Mutation(() => Boolean)
	async delete(@Arg('id') id: string): Promise<boolean> {
		const post = await Post.findOne(id);
		if (post) {
			await Post.delete(id);
			return true;
		}
		return false;
	}

	@Query(() => [Post])
	async posts(): Promise<Post[]> {
		return await Post.find();
	}

	@Query(() => Post, { nullable: true })
	async post(@Arg('id') id: string): Promise<Post | undefined | null> {
		return await Post.findOne(id);
	}
}
