import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply price filter
    productsCopy = productsCopy.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 px-2 py-2'>
          FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex gap-2 text-sm font-light text-gray-700 items-center'>
            <input
              type='number'
              className='w-20 border px-2 py-1'
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              placeholder='Min'
            />
            <span>-</span>
            <input
              type='number'
              className='w-20 border px-2 py-1'
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              placeholder='Max'
            />
          </div>
        </div>
      </div>

      {/* Product List Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 px-2'>
          <Title text1={'All'} text2={' Collections'} />
          {/* Sort Dropdown */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className='px-3 sm:px-0'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">No products found.</p>
            ) : (
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} discount={item.discount || 0} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products,search,showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relevant');

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();
//     if (showSearch&&search) {
//       productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
//     }
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) => category.includes(item.category));
//     }
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
//     }
//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();
//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     setFilterProducts(products);
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory,search,showSearch,products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
//       {/* Filter Sidebar */}
//       <div className='min-w-60'>
//         <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
//           FILTER
//           <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//         </p>

//         {/* Category Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
//             </p>
//           </div>
//         </div>

//         {/* Subcategory Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>TYPE</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
//             </p>
//           {/* <p className='flex gap-2'>
//             <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
//           </p> */}
//           </div>
//         </div>
//       </div>

//       {/* Product List Side */}
//       <div className='flex-1'>
//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//           <Title text1={'All'} text2={' Collections'} />
//           {/* Sort Dropdown */}
//           <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//             <option value="relevant">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         {/* Product Grid */}
//         <div className='px-3 sm:px-0'>
//           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//             {filterProducts.length === 0 ? (
//               <p className="text-gray-500 text-center col-span-full">No products found.</p>
//             ) : (
//               filterProducts.map((item, index) => (
//                 <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} discount={item.discount || 0}  />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;
