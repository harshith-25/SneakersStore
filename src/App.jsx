import { useState } from 'react';
import './index.css';
import Navigation from "./Navigation/Nav.jsx"
import Products from "./Products/Products.jsx";
import Recommended from "./Recommended/Recommended.jsx";
import Sidebar from './Sidebar/Sidebar.jsx';
//DATABASE
import products from "./db/data.js";
import Card from './components/Card.jsx';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [sideBar, setSideBar] = useState(false);

  //Input Filter
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const filteredItems = products.filter((product) =>
   product.title.toLowerCase().indexOf(query.toLowerCase()) !==-1);

  //Radio Filter
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  //Button Filter
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }
  
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    //Filtering Input Items
    if(query) {
      filteredProducts = filteredItems;
    }

    //Selected Filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({category, color, company, newPrice, title}) => 
      category === selected || 
      color === selected || 
      company === selected ||
      newPrice === selected ||
      title === selected 
      );
    }
    return filteredProducts.map(({img, title, star, reviews, newPrice, prevPrice}) => (
      <Card 
      key={Math.random()}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      newPrice={newPrice}
      prevPrice={prevPrice}
      />
    ));
  }

  const  result = filteredData(products, selectedCategory,query);

  return (
    <>
      <Sidebar handleChange = {handleChange}/>
      <Navigation query={query} handleInputChange = {handleInputChange}/>
      <Recommended handleClick = {handleClick}/>
      <Products result = {result}/>
    </>
  );
}

export default App;
