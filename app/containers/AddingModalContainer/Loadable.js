/**
 *
 * Asynchronously loads the component for AddingModalComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
