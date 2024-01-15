import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function DrugPageLayout({ children }: Props) {
  return <div className="p-6">{children}</div>;
}
