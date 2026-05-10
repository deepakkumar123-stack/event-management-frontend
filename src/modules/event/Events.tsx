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
  Select,
  SelectItem,
} from "@heroui/react";
import AddEvents from "./AddEvents";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AnimatedContent from "@/reactbits.ui/AnimatedContent";
import { getEvents } from "@/services/event.service";
import { EventType } from "@/@types/event.type";
import { getCategories } from "@/services/category.service";
import { CategoryType } from "@/@types/categories.type";

export const Events = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [events, setEvent] = useState<EventType[]>([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      addToast({
        title: "Toast title",
        description: "error in fetching categories",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setTimeout(() => toggleLoad());
  }, []);

  return (
    <>
      <div className=" py-2 ">
        <div className="flex flex-wrap gap-6 justify-center mt-6">
          <Select label="Filter by Category" className="w-60">
            {categories?.map((cat: CategoryType) => (
              <SelectItem key={cat._id}>{cat.name}</SelectItem>
            ))}
          </Select>
        </div>

        <div className=" flex justify-center  fixed z-50 bottom-5 right-4 ">
          <AddEvents categories={categories} />
        </div>
        <div className="flex flex-wrap gap-4 justify-center   mx-4 mt-5">
          {events?.map((event) => {
            return (
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
                      <p className="text-tiny text-white uppercase font-bold">
                        New Event
                      </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded}>
                      <h4 className=" font-medium text-neutral-700  text-2xl">
                        {event.title}
                      </h4>
                    </Skeleton>
                  </CardHeader>
                  <Skeleton isLoaded={isLoaded}>
                    <div className="w-full h-full">
                      <Image
                        removeWrapper
                        alt="Event banner"
                        className="w-full h-[100%] object-cover rounded-t-md"
                        src={event.bannerUrl}
                      />
                    </div>
                  </Skeleton>

                  <CardFooter className="absolute rounded-none bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <Skeleton className="rounded-lg mb-1" isLoaded={isLoaded}>
                        <p className="text-black text-tiny">Available soon.</p>
                      </Skeleton>
                      <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <p className="text-black text-tiny">
                          createdBy:{" "}
                          <span className="text-blue-500">
                            @{event.createdBy.name}
                          </span>
                        </p>
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
