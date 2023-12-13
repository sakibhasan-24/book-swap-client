import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";

export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
