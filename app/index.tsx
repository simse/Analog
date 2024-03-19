import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Button } from 'tamagui';
import { Stack, router } from 'expo-router';

import { loadSystemData } from '@features/gear/gearSlice';
import { cameraTypes, lensTypes, filmStocks } from '../data';


export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSystemData({
      cameraTypes,
      lensTypes,
      filmStocks,
    }));
  }, []);

  return (
    <View paddingLeft="$2" paddingRight="$2" paddingTop="$4">
        <Stack.Screen 
          options={{
            title: 'Analog',
          }}
        />
        
        <Button onTouchStart={() => router.navigate('/gear')}>Gear</Button>
    </View>
  );
}