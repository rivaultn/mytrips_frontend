/**
 *
 * Asynchronously loads the component for SubstepEditingContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
