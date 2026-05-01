import styles from "../styles/TypeFilter.module.css";

const TYPE_COLORS = {
  normal: "#9EA0A1",
  fire: "#FF9741",
  water: "#3692DC",
  grass: "#74CB48",
  electric: "#FAE078",
  ice: "#9AD8D8",
  fighting: "#CE416B",
  poison: "#AB6AC8",
  ground: "#D97845",
  flying: "#89AAE3",
  psychic: "#FB5584",
  bug: "#92BC2C",
  rock: "#C9BB8A",
  ghost: "#5269AD",
  dragon: "#0B6DC3",
  dark: "#5B5466",
  steel: "#5A8A8A",
  fairy: "#EC8FE6",
};

export default function TypeFilter({ types, selected, onChange }) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={
          selected
            ? {
                borderColor: TYPE_COLORS[selected] || "#ccc",
                color: TYPE_COLORS[selected] || "inherit",
              }
            : {}
        }
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export { TYPE_COLORS };
