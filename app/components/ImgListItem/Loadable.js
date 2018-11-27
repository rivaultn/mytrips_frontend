/**
 *
 * Asynchronously loads the component for ImgListItem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
