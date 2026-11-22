import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselMultiple() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-[14rem] sm:max-w-md">
      <CarouselContent className="-ml-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/2 pl-3 md:basis-1/3">
            <Card className="py-0">
              <CardContent className="flex aspect-square items-center justify-center p-4">
                <span className="text-2xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
