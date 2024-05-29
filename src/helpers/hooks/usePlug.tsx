import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

export const usePlug = (
  classStr: string,
): [boolean, MutableRefObject<HTMLDivElement>, JSX.Element] => {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const [heightDimen, setHeightDimen] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entry => {
      setVisible(entry[0].isIntersecting); // is there some way to optimize that
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (ref.current) setHeightDimen(ref.current.offsetHeight);
  }, [visible, classStr]);

  const Plug = useMemo(
    () => (
      <div className={classStr} style={{ height: `${heightDimen}px` }}></div>
    ),
    [classStr, heightDimen],
  );

  return [visible, ref, Plug];
};
