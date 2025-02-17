import { lazy } from "react";

const InnerRouting=[
    {
        name: "ProfileInformation",
        path: "/profileInformation",
        component: lazy(() => import("../ProfileInformation/ProfileInformation")),
      },
      {
        name:"ManagingAddress",
        path: "/manageAddress",
        component: lazy(()=> import("../ManageAddress/ManagingAddress"))
      },
      {
        name:"PanCardInformation",
        path:"/panCardInformation",
        component:lazy(()=> import("../PanCardInformation/PanCardInformation"))
      },
      {
        name:"GiftCard",
        path:"/giftCards",
        component:lazy(()=> import("../GiftCard/GiftCard"))
      },
      {
        name:"SavedUPI",
        path:"/savedUPI",
        component:lazy(()=>import("../SavedUPI/SavedUPI"))
      },
      {
        name:"SavedCards",
        path:"/savedCards",
        component:lazy(()=>import("../SavedCards/SavedCards"))
      },
      {
        name:"MyWishlist",
        path:"/myWishlist",
        component:lazy(()=>import("../MyWishlist/MyWishlist"))
      },
      {
        name: "Maintance",
        path: "*",
        component: lazy(() => import("../Maintance/Maintance")),
      }
];

export default InnerRouting;