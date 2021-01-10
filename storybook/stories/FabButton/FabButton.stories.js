import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import FabButton from '../../../src/components/FabButton';

storiesOf('FabButton', module).add('default', () => (
  <FabButton onPress={action('onPress Action')} />
));
