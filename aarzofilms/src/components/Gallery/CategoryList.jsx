import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./CategoryList.module.css";

function CategoryList({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("created_at");
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={styles.button}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
