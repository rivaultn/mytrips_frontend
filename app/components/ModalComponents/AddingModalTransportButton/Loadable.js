/**
 *
 * Asynchronously loads the component for ModalAddTransportButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
