import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./ImageGrid.module.css";

function ImageGrid({ categoryId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchImages = async () => {
      const { data } = await supabase
        .from("images")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      setImages(data || []);
    };

    fetchImages();
  }, [categoryId]);

  return (
    <div className={styles.grid}>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.image_url}
          alt={img.title || "photo"}
        />
      ))}
    </div>
  );
}

export default ImageGrid;
