import BlurText from "@/reactbits.ui/BlureText";
import DecryptedText from "@/reactbits.ui/DecryptedText";
import { Image, Badge, User, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import AnimatedContent from "@/reactbits.ui/AnimatedContent";
import EditEvent from "./EditEvent";
export const EventPreView = () => {
  return (
    <div className="h-lvh w-lvw flex flex-row bg-neutral-100 overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center px-10 bg-neutral-50 shadow-lg">
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <div className="flex flex-col items-center gap-5">
            <div>Content to Animate</div>

            <BlurText
              text="Book Show"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-6xl font-bold text-neutral-900"
            />

            <Badge size="lg" className="uppercase tracking-wide">
              Event Type: Book Fair
            </Badge>

            <DecryptedText
              text="Discover our most popular and newly released titles. From bestselling fiction to must-read nonfiction, find stories that captivate and ideas that spark curiosity."
              animateOn="view"
              revealDirection="center"
              className="font-medium text-neutral-700 text-center max-w-lg"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <User
              avatarProps={{
                src: "https://ui-avatars.com/api/?name=deepak kumar",
                size: "lg",
              }}
              name="Deepak Kumar"
              description={
                <Link
                  to=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  @deepak123
                </Link>
              }
            />

            <div className="flex gap-4 mt-2">
              {/* <Button
                color="primary"
                size="md"
                className="flex items-center gap-2"
              >
                <FiEdit className="text-lg" />
                Edit <EditEvent />
              </Button> */}
              <EditEvent />
              <Button
                color="danger"
                size="md"
                className="flex items-center gap-2"
              >
                <FiTrash2 className="text-lg" />
                Delete
              </Button>
            </div>
          </div>
        </AnimatedContent>
      </div>
      <div className="w-1/2 h-full relative">
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <Image
            alt="Event background"
            className="object-cover w-full h-full rounded-none"
            src="https://img.bookchor.com/bookchor/ltb-img/author-image/2025041575395.jpg"
          />
        </AnimatedContent>
      </div>
    </div>
  );
};

// export default EventPreView;
