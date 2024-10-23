"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { userAnswerSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ questions, activeQuestion, interviewData }) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswerInDb();
    }
  }, [userAnswer]);

  // Function to get the current active question based on type and index
  const getCurrentQuestion = () => {
    if (activeQuestion.type === "technical") {
      return questions.technical_questions[activeQuestion.index].question;
    } else if (activeQuestion.type === "behavioral") {
      return questions.behavioral_questions[activeQuestion.index].question;
    }
    return "";
  };

  const getCurrentQuestionAnswer = () => {
    if (activeQuestion.type === "technical") {
      return questions.technical_questions[activeQuestion.index].ideal_answer;
    } else if (activeQuestion.type === "behavioral") {
      return questions.behavioral_questions[activeQuestion.index].ideal_answer;
    }
    return "";
  };

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswerInDb = async () => {
    console.log(userAnswer);
    setLoading(true);
    setIsSubmitting(true);
    const currentQuestion = getCurrentQuestion();
    const currentQuestionAnswer = getCurrentQuestionAnswer();

    const feedbackPrompt =
      "Question : " +
      currentQuestion +
      " Answer : " +
      userAnswer +
      "depends on the question and users answer please give rating for the answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in json format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    try {
      const jsonFeedbackResponse = JSON.parse(mockJsonResponse);
      console.log(jsonFeedbackResponse);

      const resp = await db.insert(userAnswerSchema).values({
        mockIdRef: interviewData?.mockId,
        question: currentQuestion,
        correctAnswer: currentQuestionAnswer,
        userAnswer: userAnswer,
        feedback: jsonFeedbackResponse?.feedback,
        rating: jsonFeedbackResponse?.rating,
        userEmail: user.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      setIsSubmitting(false);

      if (resp) {
        toast("Answer saved successfully");
        setResults([]);
      } else {
        toast("Error saving answer please retry");
      }
    } catch (error) {
      toast("Error in generating questions please retry");
    }

    setResults([]);
    setUserAnswer("");
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="flex flex-col justify-center items-center bg-black mt-20 rounded-lg p-5 md:max-w-md ">
        <Image
          src={"/webcam.png"}
          width={150}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 200,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        disabled={loading || isSubmitting}
        className="my-5"
        onClick={startStopRecording}
      >
        {isSubmitting ? (
          <h2 className="flex justify-center items-center gap-2 text-gray-500">
            Submitting answer...
          </h2>
        ) : isRecording ? (
          <h2 className="flex justify-center animate-pulse items-center gap-2 text-red-500">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center justify-center">
            <Mic /> Start Recording
          </h2>
        )}
      </Button>
      <p className="text-xs bg-secondary p-2 max-w-md">
        <strong>Note</strong>: Click on start recording to start recording your
        answer. Make sure to give brief answer to AI. You will receive response
        message once your answer is saved successfully. If you did not get any
        message then please re-record your answer.
      </p>
    </div>
  );
};

export default RecordAnswerSection;
