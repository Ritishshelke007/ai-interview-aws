"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Loader from "../../_components/Loader";
import Link from "next/link";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  useEffect(() => {
    console.log(params);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const interviewId = params.interviewId;
      const response = await db
        .select()
        .from(MockInterviewSchema)
        .where(eq(MockInterviewSchema.mockId, interviewId));

      console.log(response);

      if (response.length > 0) {
        setInterviewData(response[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!interviewData) {
    return <Loader />;
  }

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="md:text-lg">
              <strong>Job Role / Job Position : </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="md:text-lg">
              <strong>Job Description / Tech Stack : </strong>
              {interviewData.jobDescription}
            </h2>
            <h2 className="md:text-lg">
              <strong>Years of Experience : </strong>
              {interviewData.jobExperience}
            </h2>
          </div>

          <div className="p-5  border rounded-lg border-yellow-300 bg-yellow-100 space-y-2">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="text-gray-600 text-sm">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div>
          {isWebcamEnabled ? (
            <Webcam
              onUserMedia={() => setIsWebcamEnabled(true)}
              onUserMediaError={() => setIsWebcamEnabled(false)}
              mirrored={true}
              style={{
                width: 300,
                height: 300,
              }}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <WebcamIcon className="h-72 w-full rounded-lg border my-7 p-20 bg-secondary" />
              <Button onClick={() => setIsWebcamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
