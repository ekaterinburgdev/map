import React, { createContext, ReactNode, useMemo, useState } from 'react';

export interface IAboutProjectContext {
  isOpened: boolean;
  open: VoidFunction;
  close: VoidFunction;
}

export const AboutProjectContext = createContext<IAboutProjectContext>({
  isOpened: false,
  open: () => {},
  close: () => {},
});

interface Props {
  children: ReactNode;
}

export function AboutProjectProvider({ children }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  const value = useMemo(
    (): IAboutProjectContext => ({
      isOpened,
      open: () => setIsOpened(true),
      close: () => setIsOpened(false),
    }),
    [isOpened],
  );

  return <AboutProjectContext.Provider value={value}>{children}</AboutProjectContext.Provider>;
}
