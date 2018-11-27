/**
 *
 * Asynchronously loads the component for AddingModalPhotoEditingContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
