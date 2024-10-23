"use client";
import { db } from "@/utils/db";
import { MockInterviewSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import Loader from "./Loader";
import { SkeletonCard } from "./SkeletonCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInterviews = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterviewSchema)
        .where(
          eq(
            MockInterviewSchema.createdBy,
            user?.primaryEmailAddress.emailAddress
          )
        )
        .orderBy(desc(MockInterviewSchema.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };
  useEffect(() => {
    user && getInterviews();
  }, [user]);
  return (
    <div>
      <h2 className="font-bold text-xl pt-5">Previous Mock Interviews</h2>

      {loading ? (
        <div className=" my-3 gap-5 grid grid-cols-1 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-600">
            No past interviews. Please create a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
