"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterviewSchema } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setjobDescription] = useState();
  const [jobExperience, setjobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  // UseEffect to add/remove overflow-hidden to body when dialog is open
  useEffect(() => {
    if (openDialog) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openDialog]);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);
    const InputPrompt = `Generate a set of interview questions and detailed answers for the role of ${jobPosition}. The questions should be tailored to the following job description and tech stack: ${jobDescription}. The candidate has ${jobExperience} years of experience in the industry, so the difficulty level should match that experience. Ensure the questions cover both technical and behavioral aspects relevant to this role.The technical questions should focus on ${jobDescription}, while behavioral questions should assess the candidate's problem-solving skills, teamwork, and adaptability in the context of the described role Provide: 5 Technical Questions with detailed ideal answers.3 Behavioral Questions with suggested ideal responses. Please return response in json format. Please ensure the questions are relevant and appropriate for the role and experience level. Generate a structured JSON response with the following fields: technical_questions: A list of technical interview questions and answers. Each question should include a 'question' string and an 'ideal_answer' string. behavioral_questions: A list of behavioral interview questions. Each question should include a 'question' string and an 'ideal_answer' string. Make sure the JSON format is valid and doesn't include unescaped characters or invalid syntax that might cause issues during parsing. Please ensure the output can be directly used with JSON.parse() without errors.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const response = JSON.parse(mockJsonResponse);

    setJsonResponse(response);

    if (response) {
      const dbResponse = await db
        .insert(MockInterviewSchema)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: response,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterviewSchema.mockId });
      console.log(dbResponse);

      if (dbResponse) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + dbResponse[0]?.mockId);
      }
    } else {
      console.log("No response from AI");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleFormSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job description,
                    and years of experience
                  </h2>

                  <div className="mt-7 my-4 space-y-2">
                    <label className="font-semibold text-black">
                      Job Role / Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3 space-y-2">
                    <label className="font-semibold text-black">
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      placeholder="Ex. ReactJS, NodeJS, MongoDB, AWS"
                      required
                      onChange={(e) => setjobDescription(e.target.value)}
                    />
                  </div>

                  <div className=" my-3 space-y-2">
                    <label className="font-semibold text-black">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 1, 2, 3"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setjobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mx-2" />{" "}
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
