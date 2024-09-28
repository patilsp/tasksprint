import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";


const PostForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
              {type} Post
            </span>
          </h1>
          {/* <p className="text-center text-gray-600 mb-8">
            {type} and share amazing posts with the all employee, and let your
            imagination run wild with our tasksprint platform
          </p> */}

          <form onSubmit={handleSubmit} className="space-y-6">


          <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Post Title
              </Label>
              <Input
                value={post.post_title}
                onChange={(e) => setPost({ ...post, post_title: e.target.value })}
                placeholder="Write your post title"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
               
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Post Tag
                <span className="text-gray-500 font-normal">
                  {" "}
                  (#product, #webdevelopment, #idea, etc.)
                </span>
              </Label>
              <Input
                value={post.post_tag}
                onChange={(e) => setPost({ ...post, post_tag: e.target.value })}
                type="text"
                placeholder="#Tag"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />


            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Post Content
              </Label>
              <Textarea
                value={post.post_content}
                onChange={(e) => setPost({ ...post, post_content: e.target.value })}
                placeholder="Write your post here"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                rows={4}
              />
            </div>

            

            <div className="flex justify-end gap-4">
              <Link href="/posts">
                <Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {submitting && (
                  <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
                )}
                {submitting ? `${type}ing...` : type}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;