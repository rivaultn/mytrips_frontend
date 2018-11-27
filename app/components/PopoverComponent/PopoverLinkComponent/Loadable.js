/**
 *
 * Asynchronously loads the component for RightLinkPopoverComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
