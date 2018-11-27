/*
 * AddingModalStepForm Messages
 *
 * This contains all the text for the AddingModalStepForm component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  name: {
    id: 'app.components.AddingModalStepEditing.name',
    defaultMessage: "Nom de l'étape",
  },
  fromDate: {
    id: 'app.components.AddingModalStepEditing.fromDate',
    defaultMessage: 'Arrivée',
  },
  toDate: {
    id: 'app.components.AddingModalStepEditing.toDate',
    defaultMessage: 'Retour',
  },
  teams: {
    id: 'app.components.AddingModalStepEditing.teams',
    defaultMessage: 'Compagnons',
  },
  noTeam: {
    id: 'app.components.AddingModalStepEditing.noTeam',
    defaultMessage: 'Aucune',
  },
  chooseTransport: {
    id: 'app.components.AddingModalStepEditing.chooseTransport',
    defaultMessage: 'Moyen(s) de transport',
  },
});
