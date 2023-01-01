import { TouchableOpacity, TouchableHighlightProps } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';

import { ExerciseDTO } from '@dtos/ExerciseDTO';

type ExerciseCardProps = TouchableHighlightProps & {
  data: ExerciseDTO;
}

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity style={{ marginBottom: 12 }} {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md'>
        <Image 
          source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
          alt='Imagem do exercício'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading fontSize='lg' color ='white' fontFamily='heading'>
            {data.name}
          </Heading>

          <Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon 
          as={Entypo} 
          name='chevron-thin-right'
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  )
}