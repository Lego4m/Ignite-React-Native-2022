import { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';

import { Controller, useForm } from 'react-hook-form';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useAuth } from '@hooks/useAuth';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/Lego4m.png');

  const toast = useToast();
  const { user } = useAuth();

  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    }
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if (photoSelected.canceled) {
        return;
      }

      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

      if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
  
      setUserPhoto(photoSelected.assets[0].uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          { photoIsLoading ? (
            <Skeleton 
              w={PHOTO_SIZE} 
              h={PHOTO_SIZE} 
              rounded='full' 
              startColor='gray.500'
              endColor='gray.400'
            />
          ) : (
            <UserPhoto 
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <Input 
                bg='gray.600'
                placeholder='Nome'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <Input 
                bg='gray.600'
                placeholder='E-mail'
                isDisabled
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Heading 
            color='gray.200' 
            fontSize='md' 
            fontFamily='heading'
            mb={2} 
            alignSelf='flex-start' 
            mt={12}
          >
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name='old_password'
            render={({ field: { onChange } }) => (
              <Input 
                bg='gray.600'
                placeholder='Senha antiga'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name='password'
            render={({ field: { onChange } }) => (
              <Input 
                bg='gray.600'
                placeholder='Nova senha'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          
          <Controller 
            control={control}
            name='confirm_password'
            render={({ field: { onChange } }) => (
              <Input 
                bg='gray.600'
                placeholder='Confirme a nova senha'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Button 
            title='Atualizar'
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}