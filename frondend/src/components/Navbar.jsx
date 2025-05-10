import React, { useContext, useState, useEffect } from 'react';
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate(); // Use it here inside the Navbar component

  const [userName, setUserName] = useState(""); // State to store user name

  // Get the user's name from localStorage on component mount
  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, [token]);

  const logout = () => {
    navigate('/login');
    toast.success("Logout Successfully")
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail'); // Clear userName from localStorage
    setToken('');
    setCartItems({});
  };

  return (
    <div
      style={{ backgroundColor: '#ffcccc' }}
      className="flex items-center justify-between py-5 px-4 font-medium relative z-40"
    >
      <Link to='/' ><img src={assets.logo} className="w-16" alt="Logo" /></Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collections'); // Navigate to collections when search icon is clicked
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />
        <div className="group relative">
          <img onClick={() => token ? null : navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
          {/* Dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Display welcome message with user name if logged in */}
        {token && userName && (
          <p className="text-lg text-gray-700  sm:block">🖐 {userName}!</p>
        )}

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Menu Icon for Mobile */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 h-screen bg-white transition-all duration-300 ease-in-out z-50 ${visible ? 'w-full p-5' : 'w-0 overflow-hidden p-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon}></img>
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collections'>COLLECTIONS</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



// import React, { useContext, useState } from 'react';
// import { assets } from "../assets/assets";
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const { setShowSearch, getCartCount,token,setToken,setCartItems } = useContext(ShopContext);
//   const navigate = useNavigate(); // Use it here inside the Navbar component
 
//   const logout = () => {
//     navigate('/login')
//     localStorage.removeItem('token')
//     setToken('')
//     setCartItems({})
   
//   }
//   return (
//     <div
//       style={{ backgroundColor: '#ffcccc' }}
//       className="flex items-center justify-between py-5 px-4 font-medium relative z-40"
//     >
//       <Link to='/' ><img src={assets.logo} className="w-16" alt="Logo" /></Link>

//       {/* Desktop Navigation */}
//       <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p>HOME</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/collections" className="flex flex-col items-center gap-1">
//           <p>COLLECTIONS</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p>ABOUT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/contact" className="flex flex-col items-center gap-1">
//           <p>CONTACT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//       </ul>

//       {/* Right Icons */}
//       <div className="flex items-center gap-6">
//         <img
//           onClick={() => {
//             setShowSearch(true);
//             navigate('/collections'); // Navigate to collections when search icon is clicked
//           }}
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           alt="Search"
//         />
//         <div className="group relative">
//           <img onClick={()=>token ? null : navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
//            {/* dropdown menu */}
//           {token && 
//           <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//           <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
//             <p  onClick={()=>navigate('/profile')}  className="cursor-pointer hover:text-black">My Profile</p>
//             <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
//             <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
//           </div>
//         </div>
//           }
//         </div>

//         <Link to="/cart" className="relative">
//           <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
//           <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">
//             {getCartCount()}
//           </p>
//         </Link>

//         {/* Menu Icon for Mobile */}
//         <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="Menu" />
//       </div>

//       <div className={`fixed top-0 left-0 h-screen bg-white transition-all duration-300 ease-in-out z-50 ${visible ? 'w-full p-5' : 'w-0 overflow-hidden p-0'}`}>
//         <div className='flex flex-col text-gray-600'>
//           <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//             <img className='h-4 rotate-180' src={assets.dropdown_icon}></img>
//             <p>Back</p>
//           </div>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collections'>COLLECTIONS</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
