import { Route,Routes,BrowserRouter } from "react-router-dom"
import Home from "./pages/Home";
import { PostsProvider } from './context/PostContext';
import PostDetails from "./pages/PostDetails";
function App() {

  return (
    <BrowserRouter>
    <PostsProvider>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Post App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
      </PostsProvider>
    </BrowserRouter>  )
}

export default App
