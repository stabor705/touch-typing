import {clsx} from "clsx";
import {useCallback, useEffect, useState} from "react";

interface TypingTrialProps {
  text: string
}

type CharacterResult = "success" | "failed" | "default"

interface CharacterTest {
  character: string
  result: CharacterResult
}

const isAPassingCharacter = (character: string) => {
  const regex = /^[a-zA-Z0-9,;.!]$/
  return regex.test(character) && character.length === 1
}

export default function TypingTrial({text}: TypingTrialProps)  {
  const [cursorPosition, setCursorPosition] = useState(0)

  const [characters, setCharacters] = useState<CharacterTest[]>(text.split('').map(character => ({result: "default", character})))

  const handleKeyDown: (event: KeyboardEvent) => void = useCallback(event => {
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
  }, [cursorPosition, characters])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
  return (
      <div>
        {characters.map((test, index) => (
            <span className={clsx("text-5xl", {"text-blue-500": index === cursorPosition, "text-red-500": test.result === "failed", "text-green-500": test.result === "success"})} key={index}>{test.character}</span>
        ))}
      </div>
  )
}