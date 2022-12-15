import { useState } from 'react';

import { HStack, VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas');

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group 
          name='costas' 
          isActive={groupSelected === 'costas'}
          onPress={() => setGroupSelected('costas')}
        />

        <Group 
          name='ombro' 
          isActive={groupSelected === 'ombro'} 
          onPress={() => setGroupSelected('ombro')}
        />
      </HStack>
    </VStack>
  )
}