import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context";
const App = () => {
  return (
    <div className="app">
      <main>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </main>
    </div>
  );
};

export default App;
