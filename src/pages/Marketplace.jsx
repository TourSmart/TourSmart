import { useState, useMemo } from 'react';
import ProductCard from '../marketplace/components/ProductCard';
import { products } from '../marketplace/data/products'; 

const categories = [
    'All', 
    'Handicrafts', 
    'Local Events/Festivals', 
    'Eco-tourism Experiences', 
    'Homestays'
];

const Marketplace = () => {

  const [view, setView] = useState('products');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    alert(`${productToAdd.name} has been added to your cart!`);
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Thank you for your order! Your purchase helps support local artisans and communities in Jharkhand.");
    setCart([]);
    setView('products');
  };

  const cartItemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(product => product.category === activeCategory);
  }, [activeCategory]);
  
  const MarketplaceHeader = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jharkhand's Local Bazaar 🛍️</h1>
          <p className="text-gray-600 mt-1">Discover authentic local goods and experiences.</p>
        </div>
        <button onClick={() => setView('cart')} className="relative p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cartItemCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
        </button>
      </div>
    </div>
  );

  const renderProductsView = () => (
    <>
      <div className="flex space-x-2 md:space-x-4 mb-8 pb-2 border-b-2 border-gray-200 overflow-x-auto">
        {categories.map((category) => (<button key={category} onClick={() => setActiveCategory(category)} className={`flex-shrink-0 px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 ${activeCategory === category ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>{category}</button>))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />))}
      </div>
    </>
  );

  const renderCartView = () => (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Your Shopping Cart</h2>
      {cart.length === 0 ? <p className="text-gray-600">Your cart is empty.</p> : <div>{cart.map(item => (<div key={item.id} className="flex items-center justify-between border-b py-4 flex-wrap"><div className="flex items-center space-x-4 mb-2 sm:mb-0"><img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" /><div><h3 className="font-semibold text-lg">{item.name}</h3><p className="text-gray-500">₹{item.price.toLocaleString()}</p></div></div><div className="flex items-center space-x-4"><div className="flex items-center border rounded-md"><button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold">-</button><span className="px-4 py-1">{item.quantity}</span><button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold">+</button></div><p className="font-bold w-24 text-right">₹{(item.price * item.quantity).toLocaleString()}</p></div></div>))}<div className="mt-6 text-right"><h3 className="text-2xl font-bold">Total: ₹{cartTotal.toLocaleString()}</h3><button onClick={() => setView('checkout')} className="mt-4 bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">Proceed to Checkout</button></div></div>}
      <button onClick={() => setView('products')} className="mt-8 text-teal-600 font-semibold hover:underline">&larr; Continue Shopping</button>
    </div>
  );
  
  const renderCheckoutView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 border-b pb-4">Shipping Information</h2>
        <form onSubmit={handlePlaceOrder}><div className="mb-4"><label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label><input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div><div className="mb-4"><label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label><input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div><div className="mb-6"><label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Shipping Address</label><textarea id="address" rows="3" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea></div><button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors">Place Order</button></form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 border-b pb-4">Order Summary</h2>
        <div>{cart.map(item => (<div key={item.id} className="flex justify-between items-center mb-3"><span className="text-gray-700">{item.name} (x{item.quantity})</span><span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span></div>))}<div className="border-t mt-4 pt-4 flex justify-between items-center"><span className="text-xl font-bold">Total Amount</span><span className="text-xl font-bold text-teal-600">₹{cartTotal.toLocaleString()}</span></div></div>
        <button onClick={() => setView('cart')} className="mt-8 text-teal-600 font-semibold hover:underline">&larr; Back to Cart</button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-6 py-8">
        <MarketplaceHeader />
        {view === 'products' && renderProductsView()}
        {view === 'cart' && renderCartView()}
        {view === 'checkout' && renderCheckoutView()}
      </main>
    </div>
  );
};

export default Marketplace;