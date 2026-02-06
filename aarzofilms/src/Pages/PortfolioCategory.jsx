import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import styles from "./PortfolioCategory.module.css";

function PortfolioCategory() {
  const { category } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (category) {
      fetchCategoryImages();
    }
  }, [category]);

  const fetchCategoryImages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("images")
      .select(`
        id,
        title,
        image_url,
        created_at,
        categories:category_id (
          name,
          slug
        )
      `)
      .eq("categories.slug", category)
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Category fetch error:", error);
      setLoading(false);
      return;
    }

    setImages(data || []);
    setLoading(false);
  };

  const formatCategoryName = (cat) => {
    if (!cat) return "";
    return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <section className={styles.portfolioCategory}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>GALLERY COLLECTION</span>
          <h1>{formatCategoryName(category)} Photography</h1>
          <p className={styles.subtitle}>
            Explore our curated collection of {formatCategoryName(category).toLowerCase()} moments, 
            each captured with precision and artistic vision.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <span>Loading {formatCategoryName(category).toLowerCase()} moments...</span>
          </div>
        ) : images.length === 0 ? (
          <div className={styles.empty}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <h3>No images found</h3>
            <p>No images available for {formatCategoryName(category).toLowerCase()} photography.</p>
          </div>
        ) : (
          <div className={styles.imageGrid}>
            {images.map((img, index) => (
              <div
                key={img.id}
                className={styles.imageCard}
                onMouseEnter={() => setHoveredImage(img.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(img)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={img.image_url} 
                    alt={img.title}
                    loading="lazy"
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay}></div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.categoryTag}>
                      <span>{img.categories?.name}</span>
                      <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <h3 className={styles.imageTitle}>{img.title}</h3>
                    
                    <div className={styles.imageMeta}>
                      <span className={styles.metaItem}>
                        <svg className={styles.metaIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {new Date(img.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardHoverEffect}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Portfolio Link */}
        {!loading && (
          <div className={styles.backLink}>
            <a href="/portfolio" className={styles.backButton}>
              <svg className={styles.backArrow} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Portfolio
            </a>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
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
                  <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
                </div>
                <div className={styles.modalDate}>
                  <svg className={styles.modalDateIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {new Date(selectedImage.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <p className={styles.modalDescription}>
                A beautifully captured {formatCategoryName(category).toLowerCase()} moment, preserving the emotion and story through expert photography.
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

export default PortfolioCategory;