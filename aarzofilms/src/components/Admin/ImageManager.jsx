// import { useEffect, useState } from "react";
// import { supabase } from "../../services/supabaseClient";
// import styles from "./ImageManager.module.css";

// function ImageManager() {
//   const [categories, setCategories] = useState([]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const { data } = await supabase
//         .from("categories")
//         .select("*");
//       setCategories(data || []);
//     };
//     fetchCategories();
//   }, []);

//   const uploadImage = async (e) => {
//     e.preventDefault();
//     if (!file || !categoryId) return;

//     setLoading(true);

//     // 1️⃣ Upload to Cloudinary
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const cloudData = await res.json();

//     // 2️⃣ Save image URL in Supabase
//     await supabase.from("images").insert({
//       title,
//       image_url: cloudData.secure_url,
//       category_id: categoryId,
//     });

//     // Reset
//     setFile(null);
//     setTitle("");
//     setCategoryId("");
//     setLoading(false);

//     alert("Image uploaded successfully ✅");
//   };

//   return (
//     <div className={styles.container}>
//       <h3>Upload Image</h3>

//       <form onSubmit={uploadImage} className={styles.form}>
//         <input
//           type="text"
//           placeholder="Image title (optional)"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <select
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//           required
//         >
//           <option value="">Select category</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ImageManager;

import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./ImageManager.module.css";

function ImageManager() {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [images, setImages] = useState([]);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    setCategories(data || []);
  };

  const fetchImages = async () => {
    const { data } = await supabase
      .from("images")
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .order("created_at", { ascending: false });
    setImages(data || []);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMsg("Please select an image file");
      return;
    }

    if (!categoryId) {
      setErrorMsg("Please select a category");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1️⃣ Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await res.json();

      if (!res.ok) {
        throw new Error(cloudData.error?.message || "Upload failed");
      }

      // 2️⃣ Save image URL in Supabase
      const { error } = await supabase.from("images").insert({
        title: title.trim(),
        image_url: cloudData.secure_url,
        category_id: categoryId,
      });

      if (error) throw error;

      // Reset form
      setFile(null);
      setTitle("");
      setCategoryId("");
      setSuccessMsg("Image uploaded successfully!");
      
      // Refresh images list
      fetchImages();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);

    } catch (error) {
      setErrorMsg(error.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("images")
      .delete()
      .eq('id', imageId);

    if (error) {
      setErrorMsg(error.message);
    } else {
      fetchImages();
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Manage Images</h3>
        <p>Upload and manage portfolio images</p>
      </div>

      <form onSubmit={uploadImage} className={styles.form}>
        <div className={styles.inputGrid}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              id="image-title"
            />
            <label htmlFor="image-title">
              <span className={styles.labelText}>Image Title (Optional)</span>
              <div className={styles.fieldLine}></div>
            </label>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
          </div>

          <div className={styles.field}>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={loading}
              required
              id="image-category"
            >
              <option value=""></option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <label htmlFor="image-category">
              <span className={styles.labelText}>Select Category</span>
              <div className={styles.fieldLine}></div>
            </label>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>

          <div className={styles.field}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
              required
              id="image-file"
            />
            <label htmlFor="image-file">
              <span className={styles.labelText}>Choose Image File</span>
              <div className={styles.fieldLine}></div>
            </label>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.uploadButton}
          >
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <span>Upload Image</span>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
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

        {successMsg && (
          <div className={styles.success}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{successMsg}</span>
          </div>
        )}
      </form>

      <div className={styles.imagesList}>
        <div className={styles.listHeader}>
          <span className={styles.headerLabel}>Preview</span>
          <span className={styles.headerLabel}>Title & Category</span>
          <span className={styles.headerLabel}>Actions</span>
        </div>

        <div className={styles.listContent}>
          {images.length === 0 ? (
            <div className={styles.empty}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>No images yet. Upload your first image!</span>
            </div>
          ) : (
            images.map((img) => (
              <div key={img.id} className={styles.imageItem}>
                <div className={styles.imagePreview}>
                  <img 
                    src={img.image_url} 
                    alt={img.title || "Portfolio image"}
                    loading="lazy"
                  />
                </div>
                
                <div className={styles.imageInfo}>
                  <span className={styles.imageTitle}>
                    {img.title || "Untitled"}
                  </span>
                  <span className={styles.imageCategory}>
                    <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    {img.categories?.name || "Uncategorized"}
                  </span>
                </div>
                
                <div className={styles.actions}>
                  <a 
                    href={img.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButton}
                  >
                    <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    View
                  </a>
                  <button 
                    onClick={() => deleteImage(img.id)}
                    disabled={loading}
                    className={styles.deleteButton}
                  >
                    <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}>
          <span className={styles.statNumber}>{images.length}</span>
          <span className={styles.statLabel}>Total Images</span>
        </span>
        <span className={styles.stat}>
          <span className={styles.statNumber}>
            {categories.length}
          </span>
          <span className={styles.statLabel}>Categories</span>
        </span>
      </div>
    </div>
  );
}

export default ImageManager;