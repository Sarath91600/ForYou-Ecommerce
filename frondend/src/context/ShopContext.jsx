import { createContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 150;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

       
    


    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState("")


    const hasLoadedCart = useRef(false);

   ////////////////////////////////////////////////////////////////////
   
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("please select a size");
            return;
        }
        let cartdata = structuredClone(cartItems);
        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += 1;
            } else {
                cartdata[itemId][size] = 1;
            }
        } else {
            cartdata[itemId] = {};
            cartdata[itemId][size] = 1;
        }
        setCartItems(cartdata);
        toast.success("Item added to cart!");
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
            
        }
    };

///////////////////////////////////////////////////////////////////////////

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    };

    ////////////////////////////////////////////////////////////////////////////////

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            console.log("Backend Response:", response.data);  // Log to see the response structure
            
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

  //////////////////////////////

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  

//////////////////////////////////////////////////////////////////////////////////////

const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
        try {
            await axios.post(
                backendUrl + '/api/cart/update',
                { itemId, size, quantity },
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
};

const getUserCart = async (token) => {
    try {
        const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
            setCartItems(response.data.cartData)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}

const fetchCartFromDb = async () => {
  const { data } = await axios.get(backendUrl + '/api/cart', {
    headers: { token },
  });
  setCartItems(data.cartItems);
};





  ///////////////////////////////////////////////////////////////////////////////////  

    const getCartAmount = () => {
        let subtotal = 0;
        let totalDiscount = 0;
        const deliveryCharge = delivery_fee;
      
        for (const productId in cartItems) {
           const product = products.find((p) => p._id === productId);
        
       
          if (!product) continue;
      
          for (const variant in cartItems[productId]) {
            const quantity = cartItems[productId][variant];
      
            try {
              if (quantity > 0) {
                const originalPrice = product.price * quantity;
                const discountAmount = (product.price * product.discount / 100) * quantity;
      
                subtotal += originalPrice;
                totalDiscount += discountAmount;
              }
            } catch (error) {
              console.error("Error calculating cart amount:", error);
            }
          }
        }
      
        const total = subtotal - totalDiscount + deliveryCharge;
      
        return {
          subtotal: subtotal.toFixed(2),
          discount: totalDiscount.toFixed(2),
          deliveryCharge: deliveryCharge.toFixed(2),
          total: total.toFixed(2)
        };
      };

      useEffect(() => {
        getProductsData();
     }, []); 

   

     useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (!token && localToken) {
          setToken(localToken);
        }
      }, [token]);


      useEffect(() => {
      if (token && !hasLoadedCart.current) {
      getUserCart(token);
      hasLoadedCart.current = true; // Prevent duplicate calls
      }
     }, [token]);
      
      useEffect(() => {
        if (token) {
          getUserCart(token);
        }
      }, [token]);




      





    ///////////////////////////////////////////
//     const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

  

     const value = {
        products,productData: products,  currency, delivery_fee,
        search, setSearch, showSearch,
        setShowSearch, cartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,  backendUrl,setToken,token,setCartItems,

     };

     return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
