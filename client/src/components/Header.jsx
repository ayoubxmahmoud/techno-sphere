import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    // Prevent the default form for submition behavior to aviod page reload
    e.preventDefault();
    // Create a news URLSearchParams object based on the current location's search query string
    const urlParams = new URLSearchParams(location.search);
    // Update the searchTerm parameter in URLSearchTerm object with the current searchTerm value
    urlParams.set("searchTerm", searchTerm);
    // Convert the URLSearchParams object to a string to form the query string
    const searchQuery = urlParams.toString();
    // Navigate to Search page with the updated query string in URL
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2 border-teal-950">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-2xl font-semibold dark:text-white pr-3"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-300 text-white rounded-lg">
          Techno
        </span>
        Sphere
      </Link>
      <div className="flex gap-2 md:order-2">
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden pt-1" color="gray" pill>
          <Link to={"/search"}>
            <AiOutlineSearch />
          </Link>
        </Button>
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=dash"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            )}
            <Dropdown.Divider />
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle onClick={handleToggle} />
      </div>
      <Navbar.Collapse
        className={`${
          isNavbarOpen ? "flex flex-col" : "hidden"
        } items-start text-sm space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center lg:overflow-x-auto lg:whitespace-nowrap`}
      >
        {[
          { path: "/search", label: "For you" },
          { path: "/search?searchTerm=ai", label: "Artificial Intelligence" },
          { path: "/search?searchTerm=programming", label: "Programming" },
          { path: "/search?searchTerm=devops", label: "Devops" },
          {
            path: "/search?searchTerm=software",
            label: "Software development",
          },
          { path: "/search?searchTerm=news", label: "News" },
          // Add more items here
        ].map(({ path, label }) => (
          <Navbar.Link
            key={path}
            active={`${location.pathname}${location.search}` === path}
            className="hover:underline"
          >
            <Link to={path}>{label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
