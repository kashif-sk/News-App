import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Skeleton, Box} from 'native-base';

const CardSkeleton = (): JSX.Element => {
  const {width} = useWindowDimensions();
  return (
    <Box
      variant="card"
      margin={{base: 2, md: 3}}
      w={{base: width - 16, md: '300px'}}
      backgroundColor="coolGray.50"
      _dark={{backgroundColor: 'gray.700'}}>
      <Skeleton h="40" />
      <Skeleton.Text p="4" py="6" />
      <Skeleton h="3" w="20" rounded="full" alignSelf="center" my="4" />
    </Box>
  );
};

export default CardSkeleton;
