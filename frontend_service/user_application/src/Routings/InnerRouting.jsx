import { lazy } from "react";

const InnerRouting=[
    {
        name: "ProfileInformation",
        path: "/profileInformation",
        component: lazy(() => import("../ProfileInformation/ProfileInformation")),
      },
      {
        name: "Maintance",
        path: "*",
        component: lazy(() => import("../Maintance/Maintance")),
      }
];

export default InnerRouting;