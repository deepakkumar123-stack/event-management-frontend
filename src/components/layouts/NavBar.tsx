import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import ClickSpark from "@/reactbits.ui/ClickSpark";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";

const NavBar = () => {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/30 backdrop-filter backdrop-blur-lg shadow-sm ">
      <ClickSpark
        sparkColor="black"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <nav
          aria-label="Global"
          className="mx-auto  flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* <div className="flex lg:flex-1 z-16">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </Link>
        </div> */}

          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm/6 font-semibold text-gray-900">
              Home
            </Link>
            <Link
              to="/events"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Events
            </Link>
          </div>
          {/* <div className="absolute right-[8%]">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> */}

          <Link to="/auth-login" className="text-sm/6 font-semibold ">
            <div className="flex justify-center gap-1 items-center hover:text-blue-600">
              <LuLogIn />
              <span>Login</span>
            </div>
          </Link>
        </nav>
      </ClickSpark>
    </header>
  );
};

export default NavBar;
