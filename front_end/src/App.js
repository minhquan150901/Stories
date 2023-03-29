import {BrowserRouter, Routes, Route} from "react-router-dom";

import AddStory from "./components/content/stories/AddStory";
import EditStory from "./components/content/stories/EditStory";
import DetailStory from "./components/content/stories/DetailStory";
import CategoryList from "./components/content/category/CategoryList";
import ReadStory from "./components/content/stories/ReadStory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/category/:category/story/:id" element={<DetailStory/>}/>
        <Route path="/category/:category" element={<CategoryList/>}/>
        <Route path="/story/:id" element={<DetailStory/>}/>
        <Route path="/edit/:id" element={<EditStory/>}/>
        <Route path="/add" element={<AddStory/>}/>
        <Route path="/" element={<ReadStory/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;