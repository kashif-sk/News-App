import React from 'react';
import dayjs from 'dayjs';
import {Platform, useWindowDimensions} from 'react-native';
import {Box, Button, Heading, Image, Stack, Text} from 'native-base';
import images from '../../assets';
import {isRTL, useAppTranslation} from '../../localization';
import {CardProps} from './types';

const Card = ({
  imageUrl,
  publishedDate,
  title,
  description,
  articleUrl,
  readArticle,
}: CardProps): JSX.Element => {
  const {width} = useWindowDimensions();
  const {t} = useAppTranslation();

  const textAlign =
    Platform.OS === 'web' ? (isRTL() ? 'right' : 'left') : 'left';
  return (
    <Box
      variant="card"
      margin={{base: 2, md: 3}}
      w={{base: width - 16, md: '300px'}}>
      <Box>
        <Image
          height={{base: '40', md: '56'}}
          resizeMode="cover"
          source={imageUrl ? {uri: imageUrl} : images.news}
          alt="Image"
          fallbackSource={images.news}
          loadingIndicatorSource={images.news}
        />
        <Stack space="2" p="4" pb="2">
          <Text variant="text12_200" textAlign={textAlign}>
            {dayjs(publishedDate).format('DD MMM, YYYY')}
          </Text>
          <Heading
            size="sm"
            fontWeight="medium"
            textAlign={textAlign}
            noOfLines={2}>
            {title}
          </Heading>
          <Text
            variant="text14_200"
            textAlign={textAlign}
            _dark={{color: 'coolGray.50'}}
            isTruncated
            noOfLines={3}>
            {description}
          </Text>
        </Stack>
      </Box>
      <Button pb="4" variant="link" onPress={() => readArticle(articleUrl)}>
        {t('readArticle')}
      </Button>
    </Box>
  );
};

export default Card;
