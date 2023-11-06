import TabContent from "./TabContent"
import Tabs from "./Tabs"

const MostViewed = () => {
  return (
    <div className="flex flex-col my-10 px-2">
      <p className="text-xl text-primary font-bold pb-5 uppercase">
        Most Viewed
      </p>

      <Tabs />
      <TabContent />
    </div>
  )
}

export default MostViewed
