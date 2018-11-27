/**
 *
 * Asynchronously loads the component for DatePickerComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
