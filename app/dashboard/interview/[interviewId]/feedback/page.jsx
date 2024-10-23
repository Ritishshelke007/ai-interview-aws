"use client";
import { db } from "@/utils/db";
import { userAnswerSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronsUpDownIcon } from "lucide-react";
import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState();
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdRef, params.interviewId))
      .orderBy(userAnswerSchema.id);

    console.log(result);

    setFeedbackList(result);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // Handle the scenario when no feedback is found
  if (feedbackList && feedbackList.length === 0) {
    return (
      <div className="p-10">
        <h2 className="text-3xl font-bold text-red-500">Feedback Not Found</h2>
        <p className="text-gray-500 mt-3">
          We couldn't find any feedback for this interview.
        </p>
        <Button className="mt-5" onClick={() => router.replace("/dashboard")}>
          Go to Home
        </Button>
      </div>
    );
  }

  // Loading state
  if (!feedbackList) {
    return <Loader message="Getting Interview result..." />;
  }

  // Render the feedback content when feedback exists
  return (
    <div className="p-2 md:p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-white p-2 rounded-lg w-fit text-lg my-3 bg-primary">
        Your overall interview rating : <strong>?/10</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview questions with your answer and feedback for
        improvement
      </h2>
      <Accordion type="single" collapsible defaultValue="item-0">
        {feedbackList.map((feedback, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="my-3">
            <AccordionTrigger className="flex justify-between items-center p-3 bg-secondary rounded-lg my-2 text-left gap-7">
              {feedback.question}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 border rounded-lg p-2">
                <h2 className="text-red-500 p-2 rounded-lg">
                  <strong>Rating from AI: </strong>
                  {feedback.rating}
                </h2>

                <h2 className="p-2  rounded-lg bg-red-50  text-red-900">
                  <strong>Your Answer</strong> {feedback.userAnswer}
                </h2>
                <h2 className="p-2  rounded-lg bg-green-50  text-green-900">
                  <strong>Expected Answer</strong> {feedback.correctAnswer}
                </h2>
                <h2 className="p-2  rounded-lg bg-blue-50  text-primary">
                  <strong>Feedback from AI</strong> {feedback.feedback}
                </h2>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button className="mt-5" onClick={() => router.replace("/dashboard")}>
        Go to Home
      </Button>
    </div>
  );
};

export default Feedback;
