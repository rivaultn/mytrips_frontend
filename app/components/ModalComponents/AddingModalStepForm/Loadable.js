/**
 *
 * Asynchronously loads the component for AddingModalStepForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
