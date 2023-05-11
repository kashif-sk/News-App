import React, {ErrorInfo} from 'react';

import ErrorComponent from '../Error';

import {ErrorBoundaryProps, ErrorBoundaryState, ErrorProps} from './types';
import {Box} from 'native-base';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = {error: null};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {error};
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info.componentStack);
    }
  }

  resetError: () => void = () => {
    this.setState({error: null});
  };

  override render() {
    return this.state.error ? (
      <FallbackComponent onRetry={this.resetError} />
    ) : (
      this.props.children
    );
  }
}

const FallbackComponent = (errorProps: ErrorProps) => (
  <Box flex={1}>
    <ErrorComponent {...errorProps} />
  </Box>
);

export default ErrorBoundary;
