/**
 *
 * Asynchronously loads the component for AddingModalPhotoForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
