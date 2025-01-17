import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';

const Router: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash.substring(1));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash.substring(1));
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  let Component;
  switch (route) {
    case '/about':
      Component = About;
      break;
    case '/contact':
      Component = Contact;
      break;
    case '/':
    default:
      Component = Home;
      break;
  }

  return <Component />;
};

export default Router;