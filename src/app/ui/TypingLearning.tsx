"use client"

import TypingTrial from "@/app/ui/TypingTrial";
import generateTrials from "@/app/lib/generateTrial";
import {useState} from "react";
import {TypingScore} from "@/app/lib/model";

export default function TypingLearning() {
  const trials = generateTrials(3, 20).join(" ")

  const [score, setScore] = useState<TypingScore>({accuracy: 1.0})

  return (
      <div className={"flex flex-col"}>
        <p>Accuracy: {Math.round(score.accuracy * 100)}%</p>
        <div className={"p-4 rounded-lg border border-slate-900"}>
          <TypingTrial text={trials} setScore={setScore}/>
        </div>
      </div>
  )
}