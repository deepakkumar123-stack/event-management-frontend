import { Route, Routes } from "react-router-dom";
import { lazy, PropsWithChildren, Suspense } from "react";

// const Login = lazy(() =>
//   import("./modules/auth-users/Login").then((module) => ({
//     default: module.Login,
//   }))
// );
// const SignUp = lazy(() =>
//   import("./modules/auth-users/SignUp").then((module) => ({
//     default: module.SignUp,
//   }))
// );
// setupAxios(axios);

const AuthLogin = lazy(() =>
  import("./modules/auth-users/AuthLogin").then((module) => ({
    default: module.AuthLogin,
  }))
);
const Events = lazy(() =>
  import("./modules/event/Events").then((module) => ({
    default: module.Events,
  }))
);
const AuthSignUp = lazy(() =>
  import("./modules/auth-users/AuthSignUp").then((module) => ({
    default: module.AuthSignUp,
  }))
);
const EventPreView = lazy(() =>
  import("./modules/event/EventPreView").then((module) => ({
    default: module.EventPreView,
  }))
);
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({
    default: module.Home,
  }))
);

export const SuspenseView: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-neutral-700 border-solid"></div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

function App() {
  return (
    <>
      <SuspenseView>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Events />} path="/events" />
          <Route element={<EventPreView />} path="/events/:id" />
          <Route element={<AuthLogin />} path="auth-login" />
          <Route element={<AuthSignUp />} path="/auth-sign" />
          {/* <Route element={<Login />} path="/user/login" />
        <Route element={<SignUp />} path="/user/sign-up" /> */}
        </Routes>
      </SuspenseView>
    </>
  );
}

export default App;
