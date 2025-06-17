import { Button, Divider } from "@heroui/react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold"> Event Management © 2025</div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </div>

        <div className="flex gap-4">
          <Button
            isIconOnly
            variant="light"
            className="text-neutral-300 hover:text-white"
          >
            <FaTwitter />
          </Button>
          <Button
            isIconOnly
            variant="light"
            className="text-neutral-300 hover:text-white"
          >
            <FaGithub />
          </Button>
          <Button
            isIconOnly
            variant="light"
            className="text-neutral-300 hover:text-white"
          >
            <FaLinkedin />
          </Button>
        </div>
      </div>

      {/* Divider */}
      <Divider className="mt-6 opacity-30" />
      <p className="text-center text-xs mt-3 text-neutral-500">
        Built with ❤️ using Hero UI, React, and ReactBits.
      </p>
    </footer>
  );
};

export default Footer;
