import { createBrowserRouter } from "react-router-dom";

import { LMain } from "@/layouts/l_main";
import { VHome } from "@/views/v_home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LMain />,
    children: [{ element: <VHome />, index: true }],
  },
]);
