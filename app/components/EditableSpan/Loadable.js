/**
 *
 * Asynchronously loads the component for EditableSpan
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
