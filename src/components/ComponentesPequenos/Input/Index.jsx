import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.content_input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type || "text"}
        onChange={props.onChange || null}
        value={props.value || ""}
        name={props.name || ""}
        id={props.id || ""}
        required={props.required || false}
        ref={props.ref || null}
        placeholder={props.placeholder || ""}
      />
    </div>
  );
};

export default Input;
