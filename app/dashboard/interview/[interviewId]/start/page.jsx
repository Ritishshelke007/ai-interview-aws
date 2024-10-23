"use client";
import { db } from "@/utils/db";
import { MockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState({
    type: "technical",
    index: 0,
  });
  const [openAccordionItem, setOpenAccordionItem] = useState("item-1"); // Track which accordion is open

  const getInterviewDetails = async () => {
    try {
      const interviewId = params.interviewId;
      const response = await db
        .select()
        .from(MockInterviewSchema)
        .where(eq(MockInterviewSchema.mockId, interviewId));

      const jsonMockResponse = JSON.parse(response[0].jsonMockResponse);
      setMockInterviewQuestions(jsonMockResponse);
      setInterviewData(response[0]);
      console.log(jsonMockResponse);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to check if the user is on the first question
  const isFirstQuestion = () => activeQuestion.index === 0;

  // Helper function to check if the user is on the last technical question
  const isLastTechnicalQuestion = () => {
    if (!mockInterviewQuestions) return false;
    const { technical_questions } = mockInterviewQuestions;
    return (
      activeQuestion.type === "technical" &&
      activeQuestion.index === technical_questions.length - 1
    );
  };

  // Helper function to check if the user is on the last behavioral question
  const isLastBehavioralQuestion = () => {
    if (!mockInterviewQuestions) return false;
    const { behavioral_questions } = mockInterviewQuestions;
    return (
      activeQuestion.type === "behavioral" &&
      activeQuestion.index === behavioral_questions.length - 1
    );
  };

  // Move to the first behavioral question, automatically open that accordion section
  const moveToBehavioralSection = () => {
    setActiveQuestion({ type: "behavioral", index: 0 });
    setOpenAccordionItem("item-2"); // Open the behavioral questions accordion
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        {/* Questions */}
        <QuestionsSection
          questions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          openAccordionItem={openAccordionItem} // Pass open accordion state
          setOpenAccordionItem={setOpenAccordionItem} // Pass function to update accordion state
        />
        {/* Video */}
        <RecordAnswerSection
          questions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>

      <div className=" flex justify-center md:fixed md:bottom-5 md:right-20 p-3  md:justify-end gap-6">
        {/* "Previous Question" button, disabled if it's the first question */}
        <Button
          onClick={() =>
            setActiveQuestion((prev) => ({
              ...prev,
              index: prev.index - 1,
            }))
          }
          disabled={isFirstQuestion()}
        >
          Previous Question
        </Button>

        {/* "Next Question" button, disabled if it's the last question of respective sections */}
        {!isLastTechnicalQuestion() && !isLastBehavioralQuestion() && (
          <Button
            onClick={() =>
              setActiveQuestion((prev) => ({
                ...prev,
                index: prev.index + 1,
              }))
            }
          >
            Next Question
          </Button>
        )}

        {/* "Next Section" button, disabled if it's not the last technical question */}
        {isLastTechnicalQuestion() && (
          <Button onClick={moveToBehavioralSection}>Next Section</Button>
        )}

        {/* "End Interview" button, disabled if it's not the last behavioral question */}
        {isLastBehavioralQuestion() && (
          <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
            <Button onClick={() => console.log("End Interview")}>
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
