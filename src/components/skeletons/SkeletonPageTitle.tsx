import { Skeleton } from "../ui/skeleton";

export default function SkeletonPageTitle() {
  return (
    <div className="SkeletonPageTitle space-y-2">
      <Skeleton className="w-30 h-7" />
      <Skeleton className="w-80 h-5" />
    </div>
  );
}
