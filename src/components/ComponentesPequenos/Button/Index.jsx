import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      style={{
        background: props.background || "#00be19",
        color: props.color || "white",
      }}
      type={props.type || "button"}
      onClick={props.onClick || null}
    >
      {props.nome}
    </button>
  );
};

export default Button;
