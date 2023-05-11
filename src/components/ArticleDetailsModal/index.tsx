import React from 'react';
import WebView from 'react-native-webview';
import {Modal} from 'react-native';
import {Box, Button, CloseIcon, Spinner} from 'native-base';
import Error from '../Error';
import RtlAwareRow from '../RtlAwareRow';
import {ArticleDetailsModalProps} from './types';

const ArticleDetailsModal = ({
  visible,
  onClose,
  url,
}: ArticleDetailsModalProps): JSX.Element => {
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <Box variant="container" safeArea>
        <RtlAwareRow px="4" justifyContent="flex-end">
          <Button onPress={onClose} variant="outline">
            <CloseIcon color="gray.700" _dark={{color: 'white'}} />
          </Button>
        </RtlAwareRow>
        {typeof url !== 'string' ? (
          <Error />
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{uri: url}}
            renderLoading={() => (
              <Box flex={1}>
                <Spinner size="lg" />
              </Box>
            )}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ArticleDetailsModal;
