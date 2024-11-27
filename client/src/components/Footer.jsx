import { Button, Footer, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FooterPage = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!email && !isChecked) {
      return;
    }

    try {
      const response = await fetch("/api/subscribe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Subscription Successful!",
          text: "Thank you for subscribing to our newsletter!",
          icon: "success",
          confirmButtonText: "Awesome",
        });
        setEmail(""); // Clear the email input
        setIsChecked(false); // Reset the checkbox
      } else {
        Swal.fire({
          title: "Subscription Failed",
          text: "There was an issue with your subscription. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Footer container className="border border-t-8 border-teal-950">
      <div className="w-full max-x-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 sm:gap-2">
          <div className="grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-2">
            <div>
              <Footer.Title title="Company"/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  About Us
                </Footer.Link>
                <Footer.Link
                  href="/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Projects
                </Footer.Link>
                <Footer.Link href="/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  Careers
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  Resources
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Support" className="font-bold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Contact
                </Footer.Link>
                <Footer.Link
                  href="/help-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Help Center
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Community" className="font-bold"/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/guides"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Guides
                </Footer.Link>
                <Footer.Link
                  href="/teach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Teach
                </Footer.Link>
                <Footer.Link
                  href="/affiliate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400"
                >
                  Affiliate Partners
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="text-gray-800">
              <Footer.Title title="Newsletter" className="font-bold" />
              <p className="mt-2 text-sm text-gray-600">
                Sign up with your email to join our mailing list.
              </p>
              <form className="mt-4 space-y-4" onSubmit={handleSubscription}>
                <div>
                  <Label value="Email Address:" required />
                  <TextInput
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-start flex-col sm:flex-row mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded checked:bg-emerald-700"
                      id="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      required
                    />
                    <p className="ml-4 text-sm text-gray-600">
                      I would like to receive emails from TechnoSphere
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white w-full mt-4"
                  pill
                >
                  Submit
                </Button>
              </form>

              <div className="flex space-x-4 mt-6 text-gray-500">
                {["twitter", "facebook-f", "youtube", "linkedin-in"].map(
                  (icon, index) => (
                    <a
                      key={index}
                      className="footer-social-icon w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-teal-500 hover:text-white transition duration-200 ease-in-out"
                      href="#"
                      aria-label={icon.charAt(0).toUpperCase() + icon.slice(1)}
                    >
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-t border-gray-500 h-1" />
        <div className="py-2">
          <div className="text-center">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-300 text-white rounded-lg">
                Techno
              </span>
              Sphere
            </Link>
          </div>
          <Footer.Copyright
            href="#"
            by="TechnoSphere LLC. All rights reserved"
            year={"2010-" + new Date().getFullYear()}
            className="text-sm text-gray-600 text-center mt-3"
          />
          <div className="flex justify-center gap-4 mt-4 text-gray-600 text-sm">
            <a href="/policies" className="hover:text-teal-500">
              Terms of Use
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="/privacy-notice" className="hover:text-teal-500">
              Privacy Notice
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="/modern-slavery-statement" className="hover:text-teal-500">
              Modern Slavery Statement
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterPage;
