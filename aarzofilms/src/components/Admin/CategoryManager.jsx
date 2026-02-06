// import { useEffect, useState } from "react";
// import { supabase } from "../../services/supabaseClient";
// import styles from "./CategoryManager.module.css";

// function CategoryManager() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Fetch all categories
//   const fetchCategories = async () => {
//     const { data, error } = await supabase
//       .from("categories")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) {
//       setCategories(data || []);
//     }
//   };

//   // Add new category with slug
//   const addCategory = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       setErrorMsg("Category name cannot be empty");
//       return;
//     }

//     setLoading(true);
//     setErrorMsg("");

//     const slug = name
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//     const { error } = await supabase
//       .from("categories")
//       .insert({
//         name: name.trim(),
//         slug,
//       });

//     if (error) {
//       setErrorMsg(error.message);
//     } else {
//       setName("");
//       fetchCategories();
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h3 className={styles.heading}>Manage Categories</h3>

//       <form onSubmit={addCategory} className={styles.form}>
//         <input
//           type="text"
//           placeholder="Category name (e.g. Wedding)"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Category"}
//         </button>
//       </form>

//       {errorMsg && <p className={styles.error}>{errorMsg}</p>}

//       <ul className={styles.list}>
//         {categories.map((cat) => (
//           <li key={cat.id} className={styles.item}>
//             <span className={styles.catName}>{cat.name}</span>
//             <span className={styles.slug}>/{cat.slug}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoryManager;



import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./CategoryManager.module.css";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCategories(data || []);
    }
  };

  // Add new category with slug
  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Category name cannot be empty");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase
      .from("categories")
      .insert({
        name: name.trim(),
        slug,
      });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setName("");
      fetchCategories();
    }

    setLoading(false);
  };

  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq('id', categoryId);

    if (error) {
      setErrorMsg(error.message);
    } else {
      fetchCategories();
    }
    setLoading(false);
  };

  const startEditing = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName("");
  };

  const updateCategory = async (categoryId) => {
    if (!editName.trim()) {
      setErrorMsg("Category name cannot be empty");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const slug = editName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase
      .from("categories")
      .update({
        name: editName.trim(),
        slug,
        updated_at: new Date().toISOString()
      })
      .eq('id', categoryId);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setEditingCategory(null);
      setEditName("");
      fetchCategories();
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Manage Categories</h3>
        <p>Create and manage portfolio categories</p>
      </div>

      <form onSubmit={addCategory} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <label>
              <span className={styles.labelText}>Category Name (e.g. Wedding)</span>
              <div className={styles.fieldLine}></div>
            </label>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.addButton}
          >
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add Category</span>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"/>
                </svg>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className={styles.error}>
            <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      <div className={styles.categoriesList}>
        <div className={styles.listHeader}>
          <span className={styles.headerLabel}>Name</span>
          <span className={styles.headerLabel}>Slug</span>
          <span className={styles.headerLabel}>Actions</span>
        </div>

        <div className={styles.listContent}>
          {categories.length === 0 ? (
            <div className={styles.empty}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>No categories yet. Create your first one!</span>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className={styles.categoryItem}>
                {editingCategory === cat.id ? (
                  <div className={styles.editField}>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                ) : (
                  <span className={styles.categoryName}>
                    <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    {cat.name}
                  </span>
                )}
                
                <span className={styles.categorySlug}>
                  /{cat.slug}
                </span>
                
                <div className={styles.actions}>
                  {editingCategory === cat.id ? (
                    <>
                      <button 
                        onClick={() => updateCategory(cat.id)}
                        disabled={loading}
                        className={styles.saveButton}
                      >
                        <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"/>
                        </svg>
                        Save
                      </button>
                      <button 
                        onClick={cancelEditing}
                        disabled={loading}
                        className={styles.cancelButton}
                      >
                        <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEditing(cat)}
                        className={styles.editButton}
                      >
                        <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteCategory(cat.id)}
                        disabled={loading}
                        className={styles.deleteButton}
                      >
                        <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}>
          <span className={styles.statNumber}>{categories.length}</span>
          <span className={styles.statLabel}>Total Categories</span>
        </span>
        <span className={styles.stat}>
          <span className={styles.statNumber}>
            {categories.filter(c => c.created_at).length}
          </span>
          <span className={styles.statLabel}>Active</span>
        </span>
      </div>
    </div>
  );
}

export default CategoryManager;