import {ComponentProps, ReactNode} from 'react';

import Error from '../Error';

export type ErrorBoundaryProps = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  onError?: (error: Error, stackTrace: string) => void;
};

export type ErrorBoundaryState = {error: Error | null};

export type ErrorProps = ComponentProps<typeof Error>;
