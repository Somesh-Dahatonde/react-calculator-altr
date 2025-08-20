import { memo, useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";

const buttonStyles = {
  default: {
    backgroundColor: "#505050",
    color: "#ffffff",
    hoverBg: "#606060",
    activeBg: "#404040",
  },
  operation: {
    backgroundColor: "#ff9500",
    color: "#ffffff",
    hoverBg: "#ffaa33",
    activeBg: "#ff2d2d", // red highlight when active
  },
  function: {
    backgroundColor: "#a6a6a6",
    color: "#000000",
    hoverBg: "#b6b6b6",
    activeBg: "#969696",
  },
  equals: {
    backgroundColor: "#ff9500",
    color: "#ffffff",
    hoverBg: "#ffaa33",
    activeBg: "#ff8000",
  },
};

const Button = memo(
  ({
    children,
    onClick,
    className = "",
    type = "button",
    variant = "default",
    size = "normal",
    disabled = false,
    active = false,
    "aria-label": ariaLabel,
    ...props
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = (e) => {
      if (!disabled && onClick) {
        onClick(children, e);
      }
    };

    const style = buttonStyles[variant] || buttonStyles.default;
    let bgColor = style.backgroundColor;
    if (active) {
      bgColor = style.activeBg;
    } else if (isPressed) {
      bgColor = style.activeBg;
    } else if (isHovered) {
      bgColor = style.hoverBg;
    }

    const buttonClasses = [
      "d-flex align-items-center justify-content-center",
      size === "wide" ? "w-100" : "",
      active ? "btn-active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <BootstrapButton
        type={type}
        variant="custom"
        className={buttonClasses}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        disabled={disabled}
        aria-label={ariaLabel || `${children}`}
        tabIndex={disabled ? -1 : 0}
        style={{
          backgroundColor: bgColor,
          color: style.color,
          border: "none",
          borderRadius: "8px",
          fontSize: "1.5rem",
          fontWeight: variant === "function" ? 500 : 400,
          width: size === "wide" ? "100%" : "64px",
          height: "56px",
          margin: "4px",
          transition: "all 0.15s ease",
          transform: isPressed ? "scale(0.95)" : "scale(1)",
        }}
        {...props}
      >
        {children}
      </BootstrapButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
