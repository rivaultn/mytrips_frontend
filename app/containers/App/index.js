/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';

import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export function loadJS(src, id) {
  if (window.document.getElementById(id) === null) {
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    script.id = id;
    ref.parentNode.insertBefore(script, ref);
  }
}

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Mytrips" defaultTitle="Mytrips">
        <meta
          name="description"
          content="An application to manage your dataTrips"
        />
      </Helmet>
      <Container
        fluid
        style={{ height: '100vh', padding: 0, backgroundColor: '#263238' }}
      >
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  );
}
