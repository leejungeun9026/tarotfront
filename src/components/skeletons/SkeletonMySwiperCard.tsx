import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonMySwiperCard() {
  return (
    <Card className="h-full gap-2 border-violet-100 cursor-grab active:cursor-grabbing">
      <CardHeader className="grid-rows-none">
        <CardTitle>
          <Skeleton className="h-5 w-[100px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3 justify-end">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
