import React from "react";
import Loader from "@/app/dashboard/_components/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Volume2 } from "lucide-react";

const QuestionsSection = ({
  questions,
  activeQuestion,
  setActiveQuestion,
  openAccordionItem,
  setOpenAccordionItem,
}) => {
  if (!questions) {
    return <Loader />;
  }
  const { behavioral_questions, technical_questions } = questions;

  const handleQuestionClick = (type, index) => {
    setActiveQuestion({ type, index });
  };

  // Get the current active question based on the selected type and index
  const getCurrentQuestion = () => {
    if (activeQuestion.type === "technical") {
      const { question } = technical_questions[activeQuestion.index];
      return question;
    } else if (activeQuestion.type === "behavioral") {
      const { question } = behavioral_questions[activeQuestion.index];
      return question;
    }
  };

  // text to speech question
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text-to-speech");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-5 border rounded-lg mt-5">
        <Accordion
          type="single"
          collapsible
          value={openAccordionItem} // Control the accordion based on state
          onValueChange={(value) => setOpenAccordionItem(value)} // Set accordion state on change
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              Technical Questions
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {technical_questions.map((question, index) => (
                  <h2
                    key={`technical-${index}`}
                    className={`p-2 ${
                      activeQuestion.type === "technical" &&
                      activeQuestion.index === index
                        ? " bg-primary text-white"
                        : " bg-secondary"
                    } rounded-full text-xs md:text-sm text-center cursor-pointer`}
                    onClick={() => handleQuestionClick("technical", index)}
                  >
                    Question #{index + 1}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              Behavioral Questions
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {behavioral_questions.map((question, index) => (
                  <h2
                    key={`behavioral-${index}`}
                    className={`p-2 ${
                      activeQuestion.type === "behavioral" &&
                      activeQuestion.index === index
                        ? " bg-primary text-white"
                        : " bg-secondary"
                    } rounded-full text-xs md:text-sm text-center cursor-pointer`}
                    onClick={() => handleQuestionClick("behavioral", index)}
                  >
                    Question #{index + 1}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="p-8 border rounded-lg mt-8">
        <div className="space-y-3">
          <h2 className="font-bold">Current Question</h2>
          <p className="text-lg">{getCurrentQuestion()}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Volume2
                  className="cursor-pointer mt-2"
                  size={24}
                  onClick={() => textToSpeech(getCurrentQuestion())}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white">
                <p>Click to listen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default QuestionsSection;
