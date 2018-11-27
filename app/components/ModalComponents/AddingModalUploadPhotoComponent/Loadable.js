/**
 *
 * Asynchronously loads the component for AddingModalUploadPhotoComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
