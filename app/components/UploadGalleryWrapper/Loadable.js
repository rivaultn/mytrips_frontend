/**
 *
 * Asynchronously loads the component for GalleryWrapper
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
