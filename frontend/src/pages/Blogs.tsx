import { Blogcard } from "../components/Blogcard";
import { useBlogs } from "../hooks";
import { HomeSkeleton } from "../components/HomeSkeleton";
import {readFromISOFormat} from '../config'

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <div className="flex justify-center">
          <div>
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog, ID) => {
            const date = readFromISOFormat(blog.createdAt);
            return (
              <Blogcard
              key={ID}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                createdAt={date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
