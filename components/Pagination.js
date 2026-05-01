import styles from "../styles/Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  function getPageNumbers() {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    if (page <= 3) end = Math.min(totalPages, 5);
    if (page >= totalPages - 2) start = Math.max(1, totalPages - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return { pages, start, end };
  }

  const { pages, start, end } = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button className={styles.btn} onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.btn} ${p === page ? styles.active : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={styles.ellipsis}>…</span>}
          <button className={styles.btn} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className={styles.btn}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
