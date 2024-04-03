import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc";
import { MessageSquareDashedIcon, PlaySquare, Users } from "lucide-react";

function Dashboard() {
  const { data } = trpc.movie.getDashboardInfo.useQuery();

  return (
    <div className="mx-4 mt-20 grid gap-4 md:mx-20 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-secondary/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Total Movies
          </CardTitle>
          <PlaySquare className="text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.movies}</div>
        </CardContent>
      </Card>
      <Card className="bg-secondary/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Users
          </CardTitle>
          <Users className="text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.user}</div>
        </CardContent>
      </Card>
      <Card className="bg-secondary/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Today's comments
          </CardTitle>
          <MessageSquareDashedIcon className="text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.todaysComments}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
