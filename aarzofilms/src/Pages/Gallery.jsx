import { useState } from "react";
import CategoryList from "../components/Gallery/CategoryList";
import ImageGrid from "../components/Gallery/ImageGrid";
import Contact from "../components/Contact/ContactForm";


function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gallery</h1>
      <CategoryList onSelect={setSelectedCategory} />
      {selectedCategory && (
        <ImageGrid categoryId={selectedCategory} />
      )}
      <Contact />
    </div>
  );
}

export default Gallery;
