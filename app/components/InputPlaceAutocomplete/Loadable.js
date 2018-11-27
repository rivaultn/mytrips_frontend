/**
 *
 * Asynchronously loads the component for InputPlaceAutocomplete
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
