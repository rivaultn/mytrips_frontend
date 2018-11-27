/**
 *
 * Asynchronously loads the component for TransportComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
