import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectSkeleton() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Skeleton className="h-48 w-full rounded-lg mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillSkeleton() {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
      <Skeleton className="h-6 w-24 mb-2" />
      <Skeleton className="h-2 w-full mb-1" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-full" />
      </div>
      <Skeleton className="h-12 w-96 mx-auto mb-6" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
