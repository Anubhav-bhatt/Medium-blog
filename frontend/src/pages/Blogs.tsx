import { useBlogs } from "../hooks";
import { Appbar } from "./Appbar";
import { BlogCard } from "./BlogCard";

export const Blogs = () => {
    const {loading, blogs} =useBlogs();

    if(loading){
        return <div>
            ...loading
        </div>
    }
  return (
    <div>
          <Appbar></Appbar>
  
    <div className="flex justify-center">
      
 <div className="max-w-xl">
  {blogs.map(blog => <BlogCard
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate={"2323 march 20202"}
      />)}
      
      
    </div>
    </div>
    </div>
  );
}
