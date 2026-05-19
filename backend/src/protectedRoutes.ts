import express from "express";
import { prisma } from "./prisma.js";
import type { JobPostingCreateInput } from "../generated/prisma/models.js";
import { jobPostingSchema } from "./utils/typechecker.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";

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

export default router;
