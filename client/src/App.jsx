  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import About from "./pages/About";
  import Dashboard from "./pages/Dashboard";
  import SignIn from "./pages/SignIn";
  import SignUp from "./pages/SignUp";
  import Projects from "./pages/Projects";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import PrivateRoute from "./components/PrivateRoute";
  import CreatePost from "./pages/CreatePost";
  import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
  import UpdatePost from "./pages/UpdatePost";
  import PostPage from "./pages/PostPage";
  import ScrollToTop from "./components/ScrollToTop";
  import Search from "./pages/Search";
  import Careers from "./pages/Careers";
  import Jobs from "./pages/Jobs";
  import CreateJob from "./pages/CreateJob";
  import UpdateJob from "./pages/UpdateJob";
  import { ToastContainer } from "react-toastify";

  const App = () => {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/update-job/:jobId" element={<UpdateJob />} />
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    );
  };

  export default App;
