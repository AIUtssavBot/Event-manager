"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Brain, Award, Clock, RefreshCw } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Puzzle {
  id: number
  type: "quiz" | "riddle" | "word" | "logic"
  question: string
  options?: string[]
  answer: string
  hint?: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

export default function AttendeePuzzles() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([
    {
      id: 1,
      type: "quiz",
      question: "What programming language was created by Brendan Eich in 1995?",
      options: ["Java", "JavaScript", "Python", "C++"],
      answer: "JavaScript",
      difficulty: "easy",
      points: 10,
    },
    {
      id: 2,
      type: "riddle",
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "Echo",
      hint: "Think about sounds that repeat",
      difficulty: "medium",
      points: 20,
    },
    {
      id: 3,
      type: "logic",
      question: "If you have a 3-gallon jug and a 5-gallon jug, how can you measure exactly 4 gallons?",
      answer:
        "Fill the 5-gallon jug, then pour water into the 3-gallon jug until it's full. This leaves 2 gallons in the 5-gallon jug. Empty the 3-gallon jug and pour the 2 gallons from the 5-gallon jug into it. Fill the 5-gallon jug again and pour 1 gallon into the 3-gallon jug (which already has 2 gallons). This leaves exactly 4 gallons in the 5-gallon jug.",
      difficulty: "hard",
      points: 30,
    },
  ])

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [generatingPuzzle, setGeneratingPuzzle] = useState(false)

  const currentPuzzle = puzzles[currentPuzzleIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleNextPuzzle()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeLeft, isTimerRunning])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isAnswerCorrect = userAnswer.toLowerCase() === currentPuzzle.answer.toLowerCase()

    setIsCorrect(isAnswerCorrect)
    setShowResult(true)
    setIsTimerRunning(false)

    if (isAnswerCorrect) {
      setScore(score + currentPuzzle.points)
    }
  }

  const handleNextPuzzle = () => {
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
    setIsTimerRunning(true)
    setTimeLeft(300)

    // Move to the next puzzle or generate a new one
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1)
    } else {
      generateNewPuzzle()
    }
  }

  const generateNewPuzzle = async () => {
    setGeneratingPuzzle(true)

    try {
      const prompt = `Generate a random puzzle for an event management system. The puzzle should be one of these types: quiz, riddle, word, or logic. Include the following fields in JSON format:
      - type: the type of puzzle (quiz, riddle, word, or logic)
      - question: the puzzle question
      - options: an array of possible answers (only for quiz type)
      - answer: the correct answer
      - hint: a helpful hint (optional)
      - difficulty: easy, medium, or hard
      - points: 10 for easy, 20 for medium, 30 for hard
      
      Return ONLY the JSON object with no additional text.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      try {
        const newPuzzle = JSON.parse(text)
        newPuzzle.id = Math.max(0, ...puzzles.map((p) => p.id)) + 1

        setPuzzles([...puzzles, newPuzzle])
        setCurrentPuzzleIndex(puzzles.length)
      } catch (error) {
        console.error("Error parsing puzzle JSON:", error)
        // Fallback to a default puzzle if parsing fails
        const fallbackPuzzle: Puzzle = {
          id: Math.max(0, ...puzzles.map((p) => p.id)) + 1,
          type: "riddle",
          question:
            "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
          answer: "Keyboard",
          difficulty: "medium",
          points: 20,
        }

        setPuzzles([...puzzles, fallbackPuzzle])
        setCurrentPuzzleIndex(puzzles.length)
      }
    } catch (error) {
      console.error("Error generating puzzle:", error)
    } finally {
      setGeneratingPuzzle(false)
    }
  }

  return (
    <DashboardLayout role="attendee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AI Puzzles & Challenges</h1>
        <p className="opacity-70">Test your knowledge and problem-solving skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain size={24} />
                <h2 className="text-xl font-bold">Current Puzzle</h2>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`badge ${
                    currentPuzzle.difficulty === "easy"
                      ? "badge-primary"
                      : currentPuzzle.difficulty === "medium"
                        ? "badge-accent"
                        : "badge-secondary"
                  }`}
                >
                  {currentPuzzle.difficulty.charAt(0).toUpperCase() + currentPuzzle.difficulty.slice(1)}
                </span>
                <span className="badge badge-outline">{currentPuzzle.points} Points</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                {currentPuzzle.type.charAt(0).toUpperCase() + currentPuzzle.type.slice(1)} Challenge
              </h3>
              <p className="p-4 bg-input rounded-lg">{currentPuzzle.question}</p>
            </div>

            {!showResult ? (
              <form onSubmit={handleSubmit}>
                {currentPuzzle.type === "quiz" && currentPuzzle.options ? (
                  <div className="space-y-2 mb-6">
                    {currentPuzzle.options.map((option, index) => (
                      <label key={index} className="flex items-center gap-2 p-3 rounded-md bg-input cursor-pointer">
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={userAnswer === option}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="form-input w-auto"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="form-group mb-6">
                    <label htmlFor="answer" className="form-label">
                      Your Answer
                    </label>
                    <input
                      type="text"
                      id="answer"
                      className="form-input"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      required
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowHint(!showHint)}
                    disabled={!currentPuzzle.hint}
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={!userAnswer}>
                    Submit Answer
                  </button>
                </div>

                {showHint && currentPuzzle.hint && (
                  <div className="mt-4 p-3 rounded-md bg-input">
                    <p className="text-sm">
                      <strong>Hint:</strong> {currentPuzzle.hint}
                    </p>
                  </div>
                )}
              </form>
            ) : (
              <div className="mb-6">
                <div
                  className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
                >
                  <h3 className="font-bold mb-2">{isCorrect ? "Correct!" : "Incorrect!"}</h3>
                  <p>
                    {isCorrect
                      ? `Great job! You earned ${currentPuzzle.points} points.`
                      : `The correct answer was: ${currentPuzzle.answer}`}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <button className="btn btn-primary" onClick={handleNextPuzzle}>
                    Next Puzzle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} />
              <h3 className="text-lg font-bold">Time Left</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
              <p className="opacity-70">to solve this puzzle</p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} />
              <h3 className="text-lg font-bold">Your Score</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{score}</div>
              <p className="opacity-70">points earned</p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw size={20} />
              <h3 className="text-lg font-bold">New Puzzle</h3>
            </div>
            <p className="opacity-70 mb-4">Want to try a different puzzle?</p>
            <button className="btn btn-primary w-full" onClick={generateNewPuzzle} disabled={generatingPuzzle}>
              {generatingPuzzle ? "Generating..." : "Generate New Puzzle"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

