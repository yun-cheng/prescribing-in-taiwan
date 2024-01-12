'use client';

import { useCompletion } from 'ai/react';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

type Props = {
  prompt: string;
};

export default function Completion({ prompt }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const { completion, complete, stop } = useCompletion({
    api: `${process.env.NEXT_PUBLIC_SERVER_URL}/get_description`,
    onFinish: () => {
      return setIsLoading(false);
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      complete(prompt);
    }, 1000);
    return () => {
      clearTimeout(handler);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={isLoading ? 'min-h-[64rem]' : ''}>
      <Markdown className="prose prose-neutral max-w-none text-neutral-500 marker:text-neutral-500 prose-strong:text-neutral-500">
        {completion}
      </Markdown>
    </div>
  );
}
