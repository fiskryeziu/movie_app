import React, { useState } from "react"

const Tabs = () => {
  const [active, setIsActive] = useState("today")
  const activeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsActive(e.currentTarget.value)
    console.log(active)
  }
  return (
    <div className="flex bg-primary text-center items-center">
      <div
        className={`grow p-2 ${
          active === "today" &&
          "bg-secondary border border-primary dark:border-none"
        }`}
      >
        <button
          className="w-full bg-transparent text-sm uppercase font-bold"
          value="today"
          onClick={activeHandler}
        >
          Today
        </button>
      </div>
      <div
        className={`grow p-2 ${
          active === "week" &&
          "bg-secondary border border-primary dark:border-none"
        }`}
      >
        <button
          className="w-full bg-transparent text-sm uppercase font-bold"
          value="week"
          onClick={activeHandler}
        >
          Week
        </button>
      </div>
      <div
        className={`grow p-2 ${
          active === "month" &&
          "bg-secondary border border-primary dark:border-none"
        }`}
      >
        <button
          className="w-full bg-transparent text-sm uppercase font-bold"
          value="month"
          onClick={activeHandler}
        >
          Month
        </button>
      </div>
    </div>
  )
}

export default Tabs
