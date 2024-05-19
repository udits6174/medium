import { BlogDetails } from "../components/BlogDetails";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";
import {BlogSkeleton} from '../components/BlogSkeleton'

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>  
            <BlogSkeleton/>
        </div>
    }
    return <div>
        <BlogDetails blog={blog} />
    </div>
}