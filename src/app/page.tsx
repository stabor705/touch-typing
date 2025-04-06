import TypingLearning from "@/app/ui/TypingLearning";
import readLevels from "@/app/lib/readLevels";

export default function Home() {
  const levels = readLevels()

  return (
    <>
      <div className={"h-full flex justify-center items-center"}>
        <div className={"w-4/5"}>
          <TypingLearning levels={levels}/>
        </div>
      </div>
    </>
  )
}
