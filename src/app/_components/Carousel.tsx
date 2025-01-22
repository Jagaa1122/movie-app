import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export async function CarouselHome({ data }: { data: MovieType[] }) {

    return (
        <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
                {data.slice(0, 10).map((d) => {
                    return (
                        <CarouselItem key={d.id}>

                            <Card>
                                <CardContent className="">

                                    <Image
                                        width={1000}
                                        height={1000}
                                        className="object-cover h-[620px] w-full"
                                        src={`https://image.tmdb.org/t/p/w1280${d.backdrop_path}`}
                                        alt={d.original_title}
                                    />

                                </CardContent>
                            </Card>

                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
