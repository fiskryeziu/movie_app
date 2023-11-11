import React, { useRef, useState } from "react"
import pic from "../assets/mr-robot.jpg"
import { SendHorizonal } from "lucide-react"

const MovieComment = () => {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const commentNum: number = 1

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
    <div className="flex flex-col gap-5 m-2 sm:m-0">
      <div className="flex gap-5">
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
      <div className="h-80 w-full bg-secondary flex flex-col gap-5  overflow-y-auto p-2">
        {commentNum > 0 ? (
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 flex shrink-0 rounded-full overflow-hidden">
              <img
                src={pic}
                alt="profile-pic"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-xs ">11.11.2023</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In ad
                ullam repellendus eaque voluptate necessitatibus dolore iusto
                molestias amet sequi?
              </p>
            </div>
          </div>
        ) : (
          <p className="m-auto">Be the first to comment.</p>
        )}
      </div>
    </div>
  )
}

export default MovieComment
