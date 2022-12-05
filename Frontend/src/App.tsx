import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EditRecipe from "./components/EditRecipe";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserBookmarks from "./pages/UserBookmarks";
import UserPublishes from "./pages/UserPublishes";

export default function App() {
  return (
    <>
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
    </>
  );
}
