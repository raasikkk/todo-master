const Navbar = () => {
  return (
    <>
      <nav className="bg-violet-700 min-h-12 shadow-sm shadow-violet-700/50">
        <div className="container flex justify-between items-center p-4">
          <div className=" text-xl md:text-2xl font-semibold text-white">
            raasikkk.webdev
          </div>

          <ul className="flex gap-5 text-3xl text-white">
            <a href="https://www.linkedin.com/in/rasul-zhankeldyuly/">
              <i className="fa-brands fa-linkedin "></i>
            </a>
            <a href="https://github.com/raasikkk">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/raasikkk">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
