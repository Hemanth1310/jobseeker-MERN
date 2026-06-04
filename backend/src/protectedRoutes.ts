import express from "express";
import { prisma } from "./prisma.js";
import type { ApplicationCreateInput, JobPostingCreateInput } from "../generated/prisma/models.js";
import { applicationSchema, jobPostingSchema } from "./utils/typechecker.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";
import { isDate } from "node:util/types";
import upload from "./utils/multer.js";

const router = express.Router();

router.get("/user-details", async (req, res) => {
  const email = req.userData?.email;

  if (!email) {
    return res.status(404).json({ error: "Email invalid" });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const { password, ...rest } = user;

    res.status(200).json({
      payload: rest,
      message: "User verified.",
    });
  } catch (err) {
    return res.status(403).json({ error: "User not found." });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("hasAuth");

  res.status(200).json({ message: "Successfully Logged out" });
});

router.post("/make-a-post", async (req, res) => {
  const userData = req.userData;
  const jobPostData: JobPostingCreateInput = req.body;
  const parsedData = jobPostingSchema.safeParse(jobPostData);

  if (!userData) {
    return res.status(400).json({ error: "Invalid User" });
  }

  if (!parsedData.success) {
    return res.status(404).json({ error: "Invalid Format." });
  }

  try {
    const employer = await prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (employer?.role !== "EMPLOYER") {
      return res.status(404).json({ error: "Only Employer can post a job." });
    }

    await prisma.jobPosting.create({
      data: {
        ...parsedData.data,
        employerId: employer.id,
      },
    });

    res.status(201).json({ message: "Job successfully posted." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
  }
});

router.patch("/update-a-post/:id", async (req, res) => {
  const userData = req.userData;
  const {id} = req.params
  const jobPostData: JobPostingCreateInput = req.body;
  const parsedData = jobPostingSchema.safeParse(jobPostData);

  if (!userData) {
    return res.status(400).json({ error: "Invalid User" });
  }

  if (!parsedData.success) {
    return res.status(404).json({ error: "Invalid Format." });
  }
  if (!isDate) {
    return res.status(400).json({ error: "Id not found" });
  }

  try {
    const employer = await prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (employer?.role !== "EMPLOYER") {
      return res.status(404).json({ error: "Only Employer can post a job." });
    }

    await prisma.jobPosting.update({
        where:{
            id:id
        },
      data: {
        ...parsedData.data,
        employerId: employer.id,
      },
    });

    res.status(201).json({ message: "Job successfully posted." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
  }
});


router.get("/employer/jobPostings",async(req,res)=>{
    const userData = req.userData

    if(!userData || userData.role!=='EMPLOYER'){
        return res.status(403).json({error:"Forbidden request"})
    }
    try{
        const jobPostings = await prisma.jobPosting.findMany({
            where: {employerId:userData.id}
        })

        return res.status(200).json({payload:[...jobPostings], message:"Request Successful."})
    }catch(err){
         if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
    }
})

router.patch('/updateJobStatus/:id',async(req,res)=>{
    const {id} = req.params
    const {status} = req.query 
    const setStatus = status==='true'?true:false
    try{
        await prisma.jobPosting.update({
            where:{id:id},
            data:{isActive:setStatus}
        })
        res.status(200).json({message:"Status successfully updated"})
    }catch(err){
    if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(403).json({ error: "Record already exists." });
            }
            if(err.code==='P2025'){
                        return res.status(404).json({error:'User not found'})
                }
    }

            return res.status(500).json({ error: "Unexpected error occurred" });
    }
})

router.get("/employer/jobPosting/:id",async(req,res)=>{
    
    const {id} = req.params
    if(!id){
        return res.status(403).json({error:"Forbidden request"})
    }
    try{
        const jobPosting = await prisma.jobPosting.findUnique({
            where: {id:id}
        })
        return res.status(200).json({payload:jobPosting, message:"Request Successful."})
    }catch(err){
         if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
    }
})

router.get('/candidate/jobPostings',async(req, res)=>{
    const userId = req.userData?.id
    const userRole = req.userData?.role
    try{
      const jobPostings = await prisma.jobPosting.findMany({
        include:{
         wishlistedBy: userRole === "CANDIDATE" && userId 
            ? {
                where: { id: userId },
                select: { id: true }
              }
            : false
              }
      })

      const formattedJobPostings = jobPostings.map((job)=>({
        ...job,
        isWishlisted:job.wishlistedBy ? job.wishlistedBy.length > 0 : false,
        wishlistedBy:undefined
      }))
      return res.status(200).json({payload:formattedJobPostings, message:"Job Postings fetched successfully"})
    }catch(err){
         if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
    }
})


router.get("/candidate/jobPosting/:id",async(req,res)=>{
    
    const {id} = req.params
    const userId = req.userData?.id
    const userRole = req.userData?.role
    if(!id){
        return res.status(403).json({error:"Forbidden request"})
    }
    try{
        const jobPosting = await prisma.jobPosting.findUnique({
            where: {id:id},
            include:{
              wishlistedBy: userRole === "CANDIDATE" && userId 
                  ? {
                      where: { id: userId },
                      select: { id: true }
                    }
                  : false
                    }
        })

          const formattedJobPosting = {
        ...jobPosting,
        isWishlisted:jobPosting?.wishlistedBy ? jobPosting.wishlistedBy.length > 0 : false,
        wishlistedBy:undefined
      }
        return res.status(200).json({payload:formattedJobPosting, message:"Request Successful."})
    }catch(err){
         if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }

    return res.status(500).json({ error: "Unexpected error occurred" });
    }
})

router.patch('/candidate/wishlist/:jobPostId',async(req,res)=>{
  const {jobPostId} = req.params
  const userData = req.userData

    if(!userData || userData.role==='EMPLOYER'){
        return res.status(403).json({error:"Forbidden request"})
    }

    try{
      await prisma.user.update({
        where:{id:userData.id},
        data:{
          wishlist:{
            connect:{id:jobPostId}
          }
        }
      })

      return res.status(200).json({
        message:'Job wishlisted'
      })
    }catch(err){
      if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }
    }


})

router.patch('/candidate/dewishlist/:jobPostId',async(req,res)=>{
  const {jobPostId} = req.params
  const userData = req.userData

    if(!userData || userData.role==='EMPLOYER'){
        return res.status(403).json({error:"Forbidden request"})
    }

    try{
      await prisma.user.update({
        where:{id:userData.id},
        data:{
          wishlist:{
            disconnect:{id:jobPostId}
          }
        }
      })

      return res.status(200).json({
        message:'Job de-wishlisted'
      })
    }catch(err){
      if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
        }
    }
    }


})

router.post('/candidate/apply/:jobId',upload.single("file"),async(req,res)=>{
  const file = req.file
  const userId = req.userData?.id
  const {jobId} = req.params
  const applicationDetails = req.body
  const parsedData = applicationSchema.safeParse(applicationDetails)
  if(!file || !userId || !jobId){
    return res.status(404).json({error:"Invalid input"})
  }

  if(!parsedData.success){
    return res.status(400).json({error:"Invalid input"})
  }

  try{
    const job = await prisma.jobPosting.findFirst({
      where:{id:jobId as string}
    })
    const user = await prisma.user.findFirst({
      where:{id:userId}
    })
    if(!job){
      return res.status(401).json({error:'Job not found'})
    }
    if(!user){
      return res.status(401).json({error:'USer not found'})
    }

    await prisma.application.create({
      data:{
          ...parsedData.data,
          resumePath: file.path,
          jobId: job.id,
          candidateId: user.id,
      }
    })
  }catch(err){
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ error: "Record already exists." });
      }
      if(err.code==='P2025'){
                return res.status(401).json({error:'Job not found'})
        }
    }
    return res.status(500).json({ error: "Unexpected error occurred" });
  }

})


export default router;
