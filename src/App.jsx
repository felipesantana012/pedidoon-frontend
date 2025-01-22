import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { register } from "swiper/element/bundle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "swiper/css/bundle";
register();

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
