import './App.css'
// বানান ঠিক করে এবং পাথ সহজ করে দেওয়া হলো
import ProductList from './componets/ProductList/ProductList' 

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-center text-2xl font-black py-5 bg-white shadow-sm">
        React Axios Data Load API
      </h1>
      <ProductList />
    </div>
  )
}

export default App