import styles from "./Button.module.css";

export const Button = ({ children, id, onClick = () => {}, type }) => {
  return <button type={type} className={styles.button}  onClick={() => onClick(id)}>{children}</button>;
};
