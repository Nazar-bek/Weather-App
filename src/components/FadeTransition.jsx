import React from 'react';

const FadeTransition = ({ children, dependency }) => {
  const [fadeState, setFadeState] = React.useState('fade-in');
  const [renderedChildren, setRenderedChildren] = React.useState(children);

  React.useEffect(() => {
    setFadeState('fade-out');

    const timeout = setTimeout(() => {
      setRenderedChildren(children);
      setFadeState('fade-in');
    }, 300);

    return () => clearTimeout(timeout);
  }, [dependency,children]);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {renderedChildren}
    </div>
  );
};

export default FadeTransition;
