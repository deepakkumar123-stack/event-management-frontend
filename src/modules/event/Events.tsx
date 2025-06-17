// const Events = () => {
//   return <div>events</div>;
// };

// export default Events;
import {
  Card,
  CardHeader,
  Image,
  Pagination,
  CardFooter,
  Button,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import AddEvents from "./AddEvents";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import AnimatedContent from "@/reactbits.ui/AnimatedContent";
const events = [
  {
    id: 1,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    id: 2,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: 3,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-3.jpeg",
  },
  {
    id: 4,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    id: 5,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-3.jpeg",
  },
  {
    id: 6,
    title: "Acme camera",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: 7,
    title: "Acme camera",
    img: "https://img.bookchor.com/bookchor/ltb-img/author-image/2025041575395.jpg",
  },
  {
    id: 8,
    title: "Acme camera",
    img: "https://content.jdmagicbox.com/v2/comp/gandhinagar-gujarat/r1/9999pxx79.xx79.240712114316.t4r1/catalogue/samarth-events-gandhinagar-sector-26-gandhinagar-gujarat-birthday-party-organisers-s6ui6rbcno.jpg",
  },
];

export const Events = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

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
          {events.map((event) => {
            return (
              <>
                <AnimatedContent
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
                        <h4 className="text-white font-medium text-2xl">
                          Acme camera{" "}
                        </h4>
                      </Skeleton>
                    </CardHeader>
                    <Skeleton isLoaded={isLoaded}>
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-1 w-full h-full rounded-md scale-125 -translate-y-6 object-cover"
                        src={event.img}
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
                            to="/events/:id"
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

// <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>
//             <Skeleton isLoaded={isLoaded}>
//               <Image
//                 removeWrapper
//                 alt="Card example background"
//                 className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//                 src="https://heroui.com/images/card-example-1.jpeg"
//               />
//             </Skeleton>

//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <Skeleton className="rounded-lg mb-1" isLoaded={isLoaded}>
//                   <p className="text-black text-tiny">Available soon.</p>
//                 </Skeleton>
//                 <Skeleton className="rounded-lg" isLoaded={isLoaded}>
//                   <p className="text-black text-tiny">Get notified.</p>
//                 </Skeleton>
//               </div>
//               <Skeleton className="rounded-lg" isLoaded={isLoaded}>
//                 <Button
//                   className="text-tiny"
//                   color="primary"
//                   radius="full"
//                   size="sm"
//                   as={Link}
//                   to="/events/:id"
//                 >
//                   Click me
//                 </Button>
//               </Skeleton>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://heroui.com/images/card-example-2.jpeg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://heroui.com/images/card-example-3.jpeg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://heroui.com/images/card-example-4.jpeg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://heroui.com/images/card-example-5.jpeg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://heroui.com/images/card-example-6.jpeg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://img.bookchor.com/bookchor/ltb-img/author-image/2025041575395.jpg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card isFooterBlurred className="w-[280px] h-[280px] ">
//             <CardHeader className="absolute z-10 top-1 flex-col items-start">
//               <p className="text-tiny text-white/60 uppercase font-bold">
//                 New Event
//               </p>
//               <h4 className="text-white font-medium text-2xl">Acme camera </h4>
//             </CardHeader>

//             <Image
//               removeWrapper
//               alt="Card example background"
//               className="z-1 w-full h-full scale-125 -translate-y-6 object-cover"
//               src="https://content.jdmagicbox.com/v2/comp/gandhinagar-gujarat/r1/9999pxx79.xx79.240712114316.t4r1/catalogue/samarth-events-gandhinagar-sector-26-gandhinagar-gujarat-birthday-party-organisers-s6ui6rbcno.jpg"
//             />
//             <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//               <div>
//                 <p className="text-black text-tiny">Available soon.</p>
//                 <p className="text-black text-tiny">Get notified.</p>
//               </div>
//               <Button
//                 className="text-tiny"
//                 color="primary"
//                 radius="full"
//                 size="sm"
//                 as={Link}
//                 to="/events/:id"
//               >
//                 Click me
//               </Button>
//             </CardFooter>
//           </Card>
