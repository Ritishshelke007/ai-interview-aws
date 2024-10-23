"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [loadingStart, setLoadingStart] = useState(false); // Loading state for "Start" button
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const onStart = () => {
    setLoadingStart(true);
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedback = () => {
    setLoadingFeedback(true);
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  useEffect(() => {
    // Reset loading states when navigating away from the page
    const handleRouteChange = () => {
      setLoadingStart(false);
      setLoadingFeedback(false);
    };

    // Listen for route changes
    router.events?.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on unmount
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="border shadow-md p-4 rounded-lg cursor-pointer space-y-1">
      <h2 className="font-bold text-primary text-lg">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm font-semibold text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-sm text-gray-400">
        Created At: {interview?.createdAt}{" "}
      </h2>

      <div className="flex justify-between items-center mt-2 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
          disabled={loadingFeedback}
        >
          {loadingFeedback ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            "Feedback"
          )}
        </Button>
        <Button
          size="sm"
          className="w-full"
          onClick={onStart}
          disabled={loadingStart} // Disable button while loading
        >
          {loadingStart ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            "Start"
          )}
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
