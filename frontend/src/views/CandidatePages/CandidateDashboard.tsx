import React, { useEffect, useState } from "react";
import JobCard from "../../components/layouts/JobCard";
import axios from "../../utils/authMiddleware";
import {
  arrayCandidateJobPostingSchema,
  type cadidateJobPostType,
} from "../../utils/TypeChecker";
import { AxiosError } from "axios";
import Loading from "../../components/layouts/Loading";
import { ArchiveIcon, Bookmark, BookmarkCheck, BookMarked, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const CandidateDashboard = () => {
  const [jobPosts, setJobPosts] = useState<cadidateJobPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const handleNavigation = (id: string) => {
    navigate(`/employer/update-a-post/${id}`);
  };

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_API_URL}/api/private/candidate/jobPostings`,
        );
        const parsedData = arrayCandidateJobPostingSchema.safeParse(
          data.payload,
        );
        if (!parsedData.success) {
          console.error("Validation Failed: Invalid data recieved");
          setJobPosts([]);
          return;
        }
        setJobPosts(parsedData.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message);
        }
        setJobPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  if (isLoading) return <Loading />;
  if (jobPosts === null) return <div>Failed to load resources</div>;
  if (jobPosts.length === 0) return <div>No job postings found.</div>;

  const handleDeWishlist = async(id:string)=>{
    try{
       await axios.patch(`${BASE_API_URL}/api/private/candidate/dewishlist/${id}`)
       setJobPosts(prev=>prev.map(post=>post.id===id?{...post,isWishlisted:false}:post))
    }catch(err){
        console.log("Failed to save:"+err)
    }

  }

   const handleWishlist = async(id:string)=>{
    try{
       await axios.patch(`${BASE_API_URL}/api/private/candidate/wishlist/${id}`)
       setJobPosts(prev=>prev.map(post=>post.id===id?{...post,isWishlisted:true}:post))
    }catch(err){
        console.log("Failed to save:"+err)
    }

  }

  return (
    <div className="w-full h-full ">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 ">
        {jobPosts?.map((post) => (
          <JobCard key={post.id}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p className="text-mist-500 text-sm">{post.companyName}</p>
              </div>
              <div>
                {post.isWishlisted?<BookmarkCheck size={28} onClick={() => handleDeWishlist(post.id)} />:
                  <Bookmark size={28} onClick={() => handleWishlist(post.id)} />}
                
              </div>
            </div>
            <div className="flex items-center ">
              <div className="w-full flex items-center gap-1">
                {/* <label>Role:</label>
                <select
                  name="role"
                  className="border-2 rounded-lg border-mist-200 text-lg p-1 pl-3"
                  value={post.isActive + ""}
                  onChange={(e) => handleStatus(e, post.id)}
                >
                  <option value="true">Active</option>
                  <option value="false">Closed</option>
                </select> */}
              </div>
            </div>
          </JobCard>
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;
