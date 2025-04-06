"use client"

import TypingTrial from "@/app/ui/TypingTrial";
import generateTrials from "@/app/lib/generateTrial";
import {useCallback, useState} from "react";
import {Level, TypingScore} from "@/app/lib/model";
import {clsx} from "clsx";

interface TypingLearningProps {
  levels: Level[]
}

export default function TypingLearning({levels}: TypingLearningProps) {
  const [score, setScore] = useState<TypingScore | undefined>(undefined)
  const [level, setLevel] = useState(0)
  const [trial, setTrial] = useState(1)

  const regenerateTrials = useCallback(() => {
    const currentLevel = levels[level]
    return generateTrials(currentLevel.characterSet, currentLevel.clusterLength, currentLevel.numberOfClusters).join(" ")
  }, [level, levels])
  const [text, setText] = useState(regenerateTrials())

  const onTrialEnd = useCallback(() => {
    const currentLevel = levels[level]
    if (score && score.accuracy >= currentLevel.requiredAccuracy) {
      if (trial === currentLevel.requiredTrials) {
        setTrial(1)
        setLevel(level + 1)
      } else {
        setTrial(trial + 1)
      }
    }
    setText(regenerateTrials())
  }, [trial, level, levels, score])

  return (
      <div className={"flex flex-col"}>
        <p>Trial: {trial}/{levels[level].requiredTrials} Level: {level + 1}/{levels.length}</p>
        <p className={clsx({"invisible": score === undefined})}>
          Accuracy:
          <span className={clsx({
            "text-green-500": score && score.accuracy >= levels[level].requiredAccuracy,
            "text-red-500": score && score.accuracy < levels[level].requiredAccuracy
          })}>
            {Math.round((score?.accuracy ?? 1.0) * 100)}%
          </span>
        </p>
        <div className={"p-4 rounded-lg border border-slate-900"}>
          <TypingTrial text={text} setScore={setScore} onTrialEnd={onTrialEnd}/>
        </div>
      </div>
  )
}