import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const HomeUser = () => {
  return (
    <>
      <div className="pt-[72px] w-full flex justify-center pb-6">
        <Carousel className="w-3/4">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-[300px]">
                  <Card className="h-full">
                    <CardContent className="flex w-full p-6 h-full">
                      <div className="flex w-full">
                        <div className="w-3/5 bg-red-400 h-full flex flex-col justify-around items-start gap-3">
                          <span className="text-xl font-bold">
                            {index + 1}.Book Name
                          </span>
                          <p className="px-4">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsam perferendis suscipit deleniti excepturi
                            aperiam vero eaque iure! Dignissimos, quam quae.
                            Autem nulla cumque laboriosam fugit ipsum dolorum
                            quisquam, quos quasi?
                          </p>
                          <button className="bg-gray-400 w-3/5">
                            View detail
                          </button>
                        </div>
                        <div className="w-2/5 bg-yellow-200 h-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="px-10 flex flex-col gap-10 py-5">
        <h1 className="text-3xl font-bold">New Release</h1>
        <div className="flex justify-center h-[240px]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-3/4"
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 h-full"
                >
                  <div className="p-1 h-full w-[165px]">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-center py-1 h-full flex-col gap-1 px-2">
                        <div className="w-full h-3/5 bg-red-400"></div>
                        <div>Name of book</div>
                        <div className="w-full flex items-center justify-center">
                          Price : 19.99$
                        </div>
                        <div className="w-full bg-blue-600 text-white flex items-center justify-center rounded-md">
                          <button>Add to Cart</button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-10 py-5">
        <h1 className="text-3xl font-bold">Best Seller</h1>
        <div className="flex justify-center h-[240px]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-3/4"
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 h-full"
                >
                  <div className="p-1 h-full w-[165px]">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-center py-1 h-full flex-col gap-1 px-2">
                        <div className="w-full h-3/5 bg-red-400"></div>
                        <div>Name of book</div>
                        <div className="w-full flex items-center justify-center">
                          Price : 19.99$
                        </div>
                        <div className="w-full bg-blue-600 text-white flex items-center justify-center rounded-md">
                          <button>Add to Cart</button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HomeUser;
