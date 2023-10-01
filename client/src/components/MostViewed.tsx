import TabContent from "./TabContent"
import Tabs from "./Tabs"

const MostViewed = () => {
  return (
    <div className="flex flex-col my-10 px-2">
      <Tabs />
      <TabContent />
    </div>
  )
}

export default MostViewed
