// import { useEffect, useState } from "react";
// import { supabase } from "../../services/supabaseClient";
// import styles from "./Portfolio.module.css";

// const categories = [
//   { name: "All", slug: "all" },
//   { name: "Wedding", slug: "wedding" },
//   { name: "Portrait", slug: "portrait" },
//   { name: "Cinematic", slug: "cinematic" },
//   { name: "Pre-Wedding", slug: "pre-wedding" },
//   { name: "Events", slug: "events" },
// ];

// function Portfolio() {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     fetchImages();

//     const channel = supabase
//       .channel("images-realtime")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "images" },
//         fetchImages
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, []);

//   useEffect(() => {
//     if (activeCategory === "all") {
//       setFilteredImages(images);
//     } else {
//       setFilteredImages(
//         images.filter(
//           (img) => img.categories?.slug === activeCategory
//         )
//       );
//     }
//     setLoading(false);
//   }, [images, activeCategory]);

//   const fetchImages = async () => {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("images")
//       .select(`
//         id,
//         title,
//         image_url,
//         created_at,
//         categories:category_id (
//           id,
//           name,
//           slug
//         )
//       `)
//       .eq("is_visible", true)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Portfolio fetch error:", error);
//       setLoading(false);
//       return;
//     }

//     setImages(data || []);
//   };

//   return (
//     <section className={styles.portfolio} id="portfolio">
//       <div className={styles.container}>
//         <header className={styles.header}>
//           <span className={styles.label}>PORTFOLIO</span>
//           <h2>Captured Moments</h2>
//           <p>Stories told through light, emotion & composition.</p>
//         </header>

//         {/* Categories */}
//         <div className={styles.categories}>
//           {categories.map((cat) => (
//             <button
//               key={cat.slug}
//               className={`${styles.categoryBtn} ${
//                 activeCategory === cat.slug ? styles.active : ""
//               }`}
//               onClick={() => setActiveCategory(cat.slug)}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className={styles.loader}>Loading portfolio…</div>
//         ) : (
//           <div className={styles.grid}>
//             {filteredImages.map((img) => (
//               <div
//                 key={img.id}
//                 className={styles.card}
//                 onClick={() => setSelectedImage(img)}
//               >
//                 <img src={img.image_url} alt={img.title} />
//                 <div className={styles.overlay}>
//                   <span>{img.categories?.name}</span>
//                   <h3>{img.title}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {filteredImages.length === 0 && !loading && (
//           <p className={styles.empty}>No images found.</p>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div className={styles.modal} onClick={() => setSelectedImage(null)}>
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img src={selectedImage.image_url} alt={selectedImage.title} />
//             <div className={styles.modalInfo}>
//               <span>{selectedImage.categories?.name}</span>
//               <h3>{selectedImage.title}</h3>
//               <p>
//                 {new Date(selectedImage.created_at).toLocaleDateString("en-US", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Portfolio;



import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./Portfolio.module.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "All", slug: "all" },
  { name: "Wedding", slug: "wedding" },
  { name: "Portrait", slug: "portrait" },
  { name: "Cinematic", slug: "cinematic" },
  { name: "Pre-Wedding", slug: "pre-wedding" },
  { name: "Events", slug: "events" },
];

function Portfolio() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();

    const channel = supabase
      .channel("images-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        fetchImages
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter(
          (img) => img.categories?.slug === activeCategory
        )
      );
    }
    setLoading(false);
  }, [images, activeCategory]);

  const fetchImages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("images")
      .select(`
        id,
        title,
        image_url,
        created_at,
        categories:category_id (
          id,
          name,
          slug
        )
      `)
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Portfolio fetch error:", error);
      setLoading(false);
      return;
    }

    setImages(data || []);
  };

  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>OUR PORTFOLIO</span>
          <h2>Captured Moments</h2>
          <p className={styles.subtitle}>
            Stories told through light, emotion & composition — each frame a chapter in your story.
          </p>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`${styles.categoryBtn} ${
                activeCategory === cat.slug ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(cat.slug)}
            >
              {cat.name}
              {activeCategory === cat.slug && (
                <span className={styles.categoryIndicator}></span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <span>Loading portfolio...</span>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                className={styles.card}
                onClick={() => setSelectedImage(img)}
                onMouseEnter={() => setHoveredCard(img.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={img.image_url} 
                    alt={img.title} 
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}></div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.categoryTag}>
                      <span>{img.categories?.name}</span>
                      <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3>{img.title}</h3>
                    <div className={styles.date}>
                      <svg className={styles.dateIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {new Date(img.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && !loading && (
          <div className={styles.empty}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>No images found for this category</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => navigate(`/portfolio/${selectedImage.categories?.slug}`)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <div className={styles.modalImageWrapper}>
              <img src={selectedImage.image_url} alt={selectedImage.title} />
              <div className={styles.modalOverlay}></div>
            </div>
            
            <div className={styles.modalInfo}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.modalCategory}>{selectedImage.categories?.name}</span>
                  <h3>{selectedImage.title}</h3>
                </div>
                <div className={styles.modalDate}>
                  <svg className={styles.modalDateIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {new Date(selectedImage.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <p className={styles.modalDescription}>
                A beautifully captured moment, preserving the emotion and story through expert photography.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
      </div>
    </section>
  );
}

export default Portfolio;