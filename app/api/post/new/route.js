import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, post_title, post_tag, post_content } = await request.json();

    if(!userId) return new Response("Unauthorized", { status: 401 });

    try {
        await connectToDB();
        const newPost = new Post({ creator: userId, post_title, post_tag, post_content});

        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
    }
}
