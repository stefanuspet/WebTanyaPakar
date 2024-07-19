import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ClickOutside = ({
  children,
  exceptionRef = null,
  onClick,
  className = "",
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;

      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target)) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target));
      } else {
        clickedInside =
          wrapperRef.current && wrapperRef.current.contains(event.target);
      }

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

ClickOutside.propTypes = {
  children: PropTypes.node.isRequired,
  exceptionRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ClickOutside;
