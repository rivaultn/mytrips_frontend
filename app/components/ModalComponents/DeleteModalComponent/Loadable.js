/**
 *
 * Asynchronously loads the component for DeleteModalComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
