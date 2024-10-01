import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";


function App() {

  const router = createBrowserRouter(routes);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
