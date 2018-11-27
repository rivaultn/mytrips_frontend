/*
 * DeleteModalComponent Messages
 *
 * This contains all the text for the DeleteModalComponent component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  modalDeleteTitle: {
    id: 'app.components.DeleteModalComponent.modalDeleteTitle',
    defaultMessage: 'Confirmer suppression',
  },
  confirmationMessage: {
    id: 'app.components.DeleteModalComponent.confirmationMessage',
    defaultMessage: 'Attention, êtes vous sur de vouloir supprimer',
  },
  validModal: {
    id: 'app.components.DeleteModalComponent.validModal',
    defaultMessage: 'Confirmer',
  },
  cancel: {
    id: 'app.components.DeleteModalComponent.cancel',
    defaultMessage: 'Annuler',
  },
  stepToDelete: {
    id: 'app.components.DeleteModalComponent.stepToDelete',
    defaultMessage: 'cette étape ?',
  },
  tripToDelete: {
    id: 'app.components.DeleteModalComponent.tripToDelete',
    defaultMessage: 'ce voyage ?',
  },
});
