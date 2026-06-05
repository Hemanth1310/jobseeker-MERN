import React, { useEffect, useState } from "react";
import JobCard from "../../components/layouts/JobCard";
import axios from "../../utils/authMiddleware";
import {
  arrayCandidateJobPostingSchema,
  type cadidateJobPostType,
} from "../../utils/TypeChecker";
import { AxiosError } from "axios";
import Loading from "../../components/layouts/Loading";
import { useNavigate } from "react-router-dom";
import Wishlist from "../../components/layouts/Wishlist";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const CandidateDashboard = () => {
  const [jobPosts, setJobPosts] = useState<cadidateJobPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  const navigate = useNavigate();
  const handleNavigation = (id: string) => {
    navigate(`/candidate/job/${id}`);
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
          setHasError(true)
          return;
        }
        setJobPosts(parsedData.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message);
        }
        setHasError(true)
        setJobPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  if (isLoading) return <Loading />;
  if (hasError || !jobPosts) {
        return <div className="p-5 text-red-500 font-medium">Failed to load applications. Please try again later.</div>
    }
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
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 ">
        {jobPosts?.map((post) => (
          <JobCard key={post.id}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p className="text-mist-500 text-sm">{post.companyName}</p>
              </div>
              <div>
                <Wishlist isWishlisted={post.isWishlisted} id={post.id} handleDeWishlist={handleDeWishlist} handleWishlist={handleWishlist}/>
              </div>
            </div>
            <div className="flex items-center mt-5">
              <div className="w-full flex items-center gap-1">
                <button className="bg-brand-primary hover:bg-brand-secondary text-white text-sm p-2 rounded-lg" onClick={()=>handleNavigation(post.id)}>Apply Now</button>
              </div>
            </div>
          </JobCard>
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;
