import { TOGGLE } from './constants';

/**
 * Display or hide navbar for under XL device
 *
 * @param isOpen {boolean}    true if navbar should be displayed
 *
 * @return {object}    An action object with a type of TOGGLE
 */
export function toggle(isOpen) {
  return {
    type: TOGGLE,
    isOpen,
  };
}
