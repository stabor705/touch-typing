"use client"

import {clsx} from "clsx";
import {useCallback, useEffect, useState} from "react";
import {TypingScore} from "@/app/lib/model";

type CharacterResult = "success" | "failed" | "default"

interface CharacterTest {
  character: string
  result: CharacterResult
}

const isAPassingCharacter = (character: string) => {
  const regex = /^[a-zA-Z0-9,;. !]$/
  return regex.test(character) && character.length === 1
}

interface TypingTrialProps {
  text: string
  setScore: (score: TypingScore) => void
}

export default function TypingTrial({text, setScore}: TypingTrialProps)  {
  const [cursorPosition, setCursorPosition] = useState(0)

  const [characters, setCharacters] = useState<CharacterTest[]>(text.split('').map(character => ({result: "default", character})))
  const [inFocus, setInFocus] = useState(false)

  const handleKeyDown: (event: KeyboardEvent) => void = useCallback(event => {
    if (!inFocus) {
      return
    }
    if (!isAPassingCharacter(event.key)) {
      return
    }
    if (event.key === characters[cursorPosition].character) {
      setCharacters(prev => {
        const newCharacters = [...prev]
        newCharacters[cursorPosition].result = "success"
        return newCharacters
      })
    } else {
      setCharacters(prev => {
        const newCharacters = [...prev]
        newCharacters[cursorPosition].result = "failed"
        return newCharacters
      })
    }
    setCursorPosition(cursorPosition + 1)
  }, [cursorPosition, characters, inFocus])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    const successesCount = characters.filter(test => test.result === "success").length
    const totalCount = characters.filter(test => test.result !== "default").length

    if (totalCount === 0) {
      return
    }

    setScore({
      accuracy: successesCount / totalCount
    })
  }, [characters]);

  return (
      <div
          className={"text-gray-700 flex justify-start flex-wrap gap-1"}
          tabIndex={0}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
      >
        {characters.map((test, index) => (
            <span
                className={clsx(
                    "text-5xl",
                    {
                      "text-blue-500": inFocus && index === cursorPosition,
                      "text-red-500": test.result === "failed",
                      "text-green-500": test.result === "success"
                    }
                )}
                key={index}
            >
              {test.character === " " ? "·" : test.character}
            </span>
        ))}
      </div>
  )
}