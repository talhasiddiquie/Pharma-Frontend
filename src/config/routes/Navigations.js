import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DrawerAndRoutes from "./Drawer-Routes";

// const Navigations = React.memo(() => {
//     return (
//         <div>
//             <Router>
//                 <DrawerAndRoutes />
//             </Router>
//         </div>
//     );
// })
const Navigations = () => {
  return (
    // <div>
    <Router>
      <DrawerAndRoutes />
    </Router>
    // </div>
  );
};

export default Navigations;
