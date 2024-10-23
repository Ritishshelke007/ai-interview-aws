"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowUpRightFromSquare,
  CircleUserRound,
  Github,
  Laptop2,
  Linkedin,
  MessageSquareDot,
  MoveRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useUser } from "@clerk/nextjs";

const Hero = () => {
  const { user } = useUser();
  return (
    <section className="min-h-max ">
      <div className="relative mx-auto pt-36 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-5">
        <h1 className="text-gray-900 dark:text-white mx-auto max-w-4xl font-extrabold text-4xl/tight sm:text-3xl/tight lg:text-4xl/tight xl:text-5xl/tight">
          Your Personal AI Interview Coach
        </h1>
        <p className="text-gray-600 font-semibold text-lg  mx-auto max-w-3xl">
          Double your chances of landing that job offer with our AI-powered
          interview prep
        </p>
        <div
          className="flex justify-center items-center flex-wrap mx-auto pt-5
        "
        >
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#4845D2] text-white hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Go to Interview Dashboard <ArrowUpRightFromSquare />
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#4845D2] text-white hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Get Started <MoveRight />
            </Link>
          )}
        </div>

        <div>
          <h2 className="font-bold text-3xl pt-16">How it works?</h2>
          <h2 className="text-gray-500 text-sm font-semibold">
            Give mock interview in just 3 simpler easy step
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-5">
          <div className="border rounded-lg p-8 space-y-1 shadow-lg cursor-pointer transition hover:border-blue-500/10 hover:shadow-[#4845D2]/20">
            <h2>
              <CircleUserRound size={24} />
            </h2>
            <h2 className="flex gap-2 font-bold justify-center text-lg">
              Create Your Profile
            </h2>

            <p className="text-center">
              Sign up and set up your profile by entering key details like your
              role, skills, and career goals. This helps us tailor the interview
              experience specifically to you.
            </p>
          </div>
          <div className="border rounded-lg p-8 space-y-1 shadow-lg cursor-pointer transition hover:border-blue-500/10 hover:shadow-[#4845D2]/20">
            <h2>
              <Laptop2 size={24} />
            </h2>
            <h2 className="flex gap-2 font-bold justify-center text-lg">
              Start a Mock Interview
            </h2>

            <p className="text-center">
              Choose from a variety of mock interview types, including technical
              and behavioral. Answer AI-generated questions and receive
              immediate feedback.
            </p>
          </div>
          <div className="border rounded-lg p-8 space-y-1 shadow-lg cursor-pointer transition hover:border-blue-500/10 hover:shadow-[#4845D2]/20">
            <h2>
              <MessageSquareDot size={24} />
            </h2>
            <h2 className="flex gap-2 font-bold justify-center text-lg">
              Get Detailed Feedback
            </h2>

            <p className="text-center">
              After the interview, receive in-depth feedback with scores,
              insights on your answers, and suggestions for improvement to help
              you ace real-world interviews.
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center items-center max-w-4xl mx-auto
      "
      >
        <div className="w-full px-10">
          <h1 className="text-3xl font-bold text-center">FAQ</h1>
          <div className="w-full">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is an AI Mock Interview?
                </AccordionTrigger>
                <AccordionContent>
                  An AI Mock Interview is a simulated interview experience where
                  our AI asks you real-world interview questions and evaluates
                  your answers. It helps you prepare for both technical and
                  behavioral interviews.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How does the platform provide feedback?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI analyzes your responses based on accuracy, relevance,
                  and clarity, and provides detailed feedback with suggestions
                  for improvement. You'll also receive a score to track your
                  progress.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Can I choose the type of questions for the interview?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! You can select the type of interview you want, including
                  technical or behavioral. You can also choose difficulty levels
                  based on the role you’re preparing for.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Is the AI feedback reliable?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our AI is trained on industry-specific interview
                  patterns and best practices, offering insights and feedback
                  aligned with real-world expectations in your field.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="w-full bg-black text-white p-10 mt-10 flex justify-around items-center">
        <h2>Made with ❤️ by Ritish Shelke </h2>
        <div className="text-white flex gap-4 justify-center">
          <a
            href="https://github.com/ritishshelke007"
            target="_blank"
            className="hover:scale-110 transition-all duration-300"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/ritish-shelke/"
            target="_blank"
            className="hover:scale-110 transition-all duration-300"
          >
            <Linkedin />
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Hero;
