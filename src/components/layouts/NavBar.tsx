import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import ClickSpark from "@/reactbits.ui/ClickSpark";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useAuth } from "@/store/auth-user.store";
const NavBar = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { _logout } = useAuth();
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
          className="mx-auto  flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8"
        >
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-sm font-semibold text-gray-900 hover:text-blue-600"
            >
              Events
            </Link>
          </div>
          {localStorage.getItem("token") && (
            <div className="flex items-center">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src={user.avatar}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={_logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
          {!localStorage.getItem("token") && (
            <div className="flex items-center">
              <Link
                to="/auth-login"
                className="text-sm font-semibold hover:text-blue-600 "
              >
                <div className="flex  gap-1 items-center hover:text-blue-600">
                  <LuLogIn />
                  <span>Login</span>
                </div>
              </Link>
            </div>
          )}
        </nav>
      </ClickSpark>
    </header>
  );
};

export default NavBar;
