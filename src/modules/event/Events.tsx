import {
  Card,
  CardHeader,
  Image,
  Pagination,
  CardFooter,
  Button,
  Skeleton,
  Tooltip,
  addToast,
} from "@heroui/react";
import AddEvents from "./AddEvents";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AnimatedContent from "@/reactbits.ui/AnimatedContent";
import { getEvents } from "@/services/event.service";
import { EventType } from "@/@types/event.type";

export const Events = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [events, setEvent] = useState<EventType[]>([]);

  const fetchEvent = async () => {
    try {
      const data = await getEvents();
      setEvent(data);
    } catch (error) {
      addToast({
        title: "Fetch Error",
        description: "error in fetching events",
        color: "danger",
      });
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };
  useEffect(() => {
    setTimeout(() => toggleLoad(), 1000);
  }, []);

  return (
    <>
      <div className=" py-2 ">
        <div className=" flex justify-center  fixed z-50 bottom-5 right-4 ">
          <AddEvents />
        </div>
        <div className="flex flex-wrap gap-4 justify-center   mx-4 mt-5">
          {events?.map((event) => {
            return (
              <>
                <AnimatedContent
                  key={event._id}
                  distance={150}
                  direction="vertical"
                  reverse={false}
                  duration={1.2}
                  ease="bounce.out"
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1.1}
                  threshold={0.4}
                  delay={0.1}
                >
                  <Card
                    isFooterBlurred
                    className="w-[280px] h-[350px] rounded-md  "
                  >
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <Skeleton isLoaded={isLoaded}>
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          New Event
                        </p>
                      </Skeleton>
                      <Skeleton isLoaded={isLoaded}>
                        <h4 className=" font-medium text-2xl">{event.title}</h4>
                      </Skeleton>
                    </CardHeader>
                    <Skeleton isLoaded={isLoaded}>
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-1 w-full h-full rounded-md scale-125 -translate-y-6 object-cover"
                        src={event.bannerUrl}
                      />
                    </Skeleton>

                    <CardFooter className="absolute rounded-none bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                      <div>
                        <Skeleton
                          className="rounded-lg mb-1"
                          isLoaded={isLoaded}
                        >
                          <p className="text-black text-tiny">
                            Available soon.
                          </p>
                        </Skeleton>
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                          <p className="text-black text-tiny">Get notified.</p>
                        </Skeleton>
                      </div>
                      <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <Tooltip
                          content={
                            <div className="px-1 py-1">
                              <div className="text-tiny">show details</div>
                            </div>
                          }
                        >
                          <Button
                            className="text-tiny"
                            color="primary"
                            radius="full"
                            size="sm"
                            as={Link}
                            to={`/events/${event._id}`}
                          >
                            Click me
                          </Button>
                        </Tooltip>
                      </Skeleton>
                    </CardFooter>
                  </Card>
                </AnimatedContent>
              </>
            );
          })}
        </div>
        <div className="flex  justify-center mt-4 ">
          <Pagination showControls initialPage={1} total={10} />
        </div>
      </div>
    </>
  );
};
