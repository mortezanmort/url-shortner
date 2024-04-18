import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate(`/login`);
  };
  return (
    <nav className="flex items-center justify-between h-20 border border-b-1 border-b-gray-300 px-4 pr-8 z-50">
      <div className="ml-10 flex justify-center items-center gap-4 cursor-pointer" onClick={() => navigate(`/`)}>
        <span className="font-medium text-[32px] text-blue-500">URL Shortener</span>
      </div>
      <div className="flex gap-6 mr-10">
        {localStorage.getItem("token") && <Button onClick={() => navigate(`/stats`)}>Stats</Button>}
        {localStorage.getItem("token") ? (
          <Button onClick={() => handleLogOut()}>Logout</Button>
        ) : (
          <>
            <Button onClick={() => navigate(`/login`)}>Login</Button>
            <Button onClick={() => navigate(`/register`)}>Register</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
