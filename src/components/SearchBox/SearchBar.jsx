import styles from "./SearchBar.module.css";

export const SearchBar = ({ text, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>Find contacts by name:
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(evt) => onChange(evt.target.value)}
      /></label>
    </div>
  );
};
