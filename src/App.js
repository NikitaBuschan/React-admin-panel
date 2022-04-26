import React, { useEffect, useState } from "react";
import { getAllCategories, getRandomProducts } from "./Firebase";

function App() {
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    getRandomProducts(1);
    if (categories == 0) {
      getAllCategories().then((e) => {
        setCategories(e);
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>hello лыжи</h1>
      <div className="cat">
        {categories !== 0
          ? categories.map((item) => <div key={item.id}>{item.name}</div>)
          : ""}
      </div>
    </div>
  );
}

export default App;
