import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.logo}>
          <span className={styles.logoPoke}>POKÉ</span>
          <span className={styles.logoDex}>DEX</span>
          <span className={styles.logoLite}>LITE</span>
        </div>

        <div className={styles.authSection}>
          {loading ? (
            <div className={styles.loadingDot} />
          ) : session ? (
            <div className={styles.userInfo}>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={34}
                  height={34}
                  className={styles.avatar}
                />
              )}
              <span className={styles.userName}>{session.user.name}</span>
              <button
                className={styles.signOutBtn}
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className={styles.signInBtn}
              onClick={() => signIn("google")}
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.3 35.4 26.8 36 24 36c-5.2 0-9.5-2.8-11.4-6.9l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C40.6 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
    </svg>
  );
}
