import React, { useLayoutEffect, useRef, useState } from 'react';

/** A small, dependency-free animated selection background for data-id children. */
export function AnimatedBackground({
  children,
  defaultValue,
  className = '',
  backgroundClassName = 'bg-white',
  transition,
  enableHover = false,
}) {
  const containerRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [bounds, setBounds] = useState(null);
  const value = hoveredValue ?? defaultValue;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || value == null) {
      setBounds(null);
      return undefined;
    }

    const updateBounds = () => {
      const target = Array.from(container.querySelectorAll('[data-id]')).find(
        (child) => child.dataset.id === String(value),
      );
      if (!target) {
        setBounds(null);
        return;
      }
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setBounds({
        left: targetRect.left - containerRect.left + container.scrollLeft,
        top: targetRect.top - containerRect.top + container.scrollTop,
        width: targetRect.width,
        height: targetRect.height,
      });
    };

    updateBounds();
    const observer = new ResizeObserver(updateBounds);
    observer.observe(container);
    Array.from(container.children).forEach((child) => observer.observe(child));
    window.addEventListener('resize', updateBounds);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBounds);
    };
  }, [value, children]);

  const setValueFromTarget = (target) => {
    const item = target.closest('[data-id]');
    if (item && containerRef.current?.contains(item)) {
      setHoveredValue(item.dataset.id);
    }
  };

  const spring = transition?.type === 'spring';
  const backgroundStyle = bounds
    ? {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        transition: `left ${transition?.duration ?? 0.3}s ${spring ? 'cubic-bezier(.34,1.56,.64,1)' : 'ease'}, top ${transition?.duration ?? 0.3}s ease, width ${transition?.duration ?? 0.3}s ${spring ? 'cubic-bezier(.34,1.56,.64,1)' : 'ease'}, height ${transition?.duration ?? 0.3}s ease`,
      }
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onPointerOver={enableHover ? (event) => setValueFromTarget(event.target) : undefined}
      onPointerLeave={enableHover ? () => setHoveredValue(null) : undefined}
      onFocusCapture={(event) => setValueFromTarget(event.target)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHoveredValue(null);
      }}
    >
      {bounds && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-xl shadow-sm ${backgroundClassName}`}
          style={backgroundStyle}
        />
      )}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              className: `${child.props.className ?? ''} relative z-[1]`,
            })
          : child,
      )}
    </div>
  );
}
