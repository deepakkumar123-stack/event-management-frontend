import App from "@/App";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import ClickSpark from "@/reactbits.ui/ClickSpark";
const Layout = () => {
  const location = useLocation();
  const loco =
    location.pathname.includes("/auth-login") ||
    location.pathname.includes("/auth-sign");

  console.log("Current Path:", loco);

  return (
    <div className="bg-neutral-100 flex flex-col gap-2">
      <ClickSpark
        sparkColor="black"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {!loco && <NavBar />}
        <App />
        {!loco && <Footer />}
      </ClickSpark>
    </div>
  );
};

export default Layout;
