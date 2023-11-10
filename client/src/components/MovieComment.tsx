import React, { useRef, useState } from "react"
import pic from "../assets/mr-robot.jpg"
import { SendHorizonal } from "lucide-react"

const MovieComment = () => {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
  return (
    <div className="flex mb-[100px] gap-5 m-2 sm:m-0">
      <div className="w-16 h-16">
        <img
          src={pic}
          alt="profile-pic"
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <div className="w-full flex relative">
        <textarea
          ref={textareaRef}
          rows={1}
          className="m-0  w-full resize-none border rounded-xl bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 pl-3 md:pl-4 overflow-y-hidden"
          value={text}
          onChange={handleInputChange}
          placeholder="Type your comment..."
        ></textarea>
        <button
          className="absolute right-2 rounded-sm bottom-3 p-2 disabled:bg-transparent bg-primary duration-150"
          disabled={text.length === 0}
        >
          <SendHorizonal color={text.length > 0 ? "white" : "gray"} />
        </button>
      </div>
    </div>
  )
}

export default MovieComment
