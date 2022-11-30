import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Publish from "./pages/Publish";
import DetailPage from "./pages/DetailPage";
import Album from "./pages/Album";
import { RecoilRoot } from "recoil";
import UserPublishes from "./pages/UserPublishes";
import UserBookmarks from "./pages/UserBookmarks";
import EditRecipe from "./components/EditRecipe";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/bookmarks/:id' element={<UserBookmarks />} />
            <Route path='/detail/:id' element={<DetailPage />} />
            <Route path='/edit/:id' element={<EditRecipe />} />
            <Route path='/publish' element={<Publish />} />
            <Route path='/user/publishes/:id' element={<UserPublishes />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
