/**
 *
 * Asynchronously loads the component for ErrorModalComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
