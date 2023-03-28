import "./Button.scss";

interface Button {
  color: string;
  onClick?: (() => void) | undefined;
  children?: React.ReactElement;
  size?: string;
}

const Button = (props: Button) => {
  return (
    <div
      className={`button ${props.size ? props.size : "medium"} ${
        props.color ? props.color : "blue"
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Button;
