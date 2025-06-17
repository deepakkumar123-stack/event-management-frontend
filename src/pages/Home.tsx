import { Card, CardHeader, Image } from "@heroui/react";

export const Home = () => {
  return (
    <Card className="rounded-none ">
      <CardHeader className=" sticky top-10 z-10 flex-col items-start">
        <h4 className="text-neutral-300 font-medium text-6xl">
          Show Your Favourite Event
        </h4>
        <p className="text-tiny text-white/60 uppercase font-bold">New Event</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="home.webp"
      />
    </Card>
  );
};

// export default Home;
