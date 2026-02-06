import { supabase } from "../../services/supabaseClient";
import styles from "./AdminDashboard.module.css";
import CategoryManager from "./CategoryManager";
import ImageManager from "./ImageManager";

function AdminDashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Session change is handled by onAuthStateChange in AdminRoute
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <svg
                className={styles.logoIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2>Aarzo Films Admin</h2>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userBadge}>
                <span className={styles.userRole}>Admin</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <svg
                  className={styles.logoutIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>24</span>
              <span className={styles.statLabel}>Total Images</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>Today</span>
              <span className={styles.statLabel}>Last Updated</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentGrid}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Category Management</h3>
                <p>Add, edit, or remove portfolio categories</p>
              </div>
              <div className={styles.sectionContent}>
                <CategoryManager />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Image Management</h3>
                <p>Upload and manage portfolio images</p>
              </div>
              <div className={styles.sectionContent}>
                <ImageManager />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span>© {new Date().getFullYear()} Aarzo Films Admin Dashboard</span>
          <span>Secure Admin Area</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
