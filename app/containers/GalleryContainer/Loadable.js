/**
 *
 * Asynchronously loads the component for GalleryContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
