import { Button } from "@ui/InteractiveElement";
import { memo, MouseEventHandler, ReactElement, SVGProps } from "react";

type ControlButtonProps = {
  active?: boolean;
  title?: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ControlButton = ({
  active,
  title,
  icon,
  onClick,
}: ControlButtonProps) => {
  return (
    <Button onClick={onClick} icon={icon} design="outline" pressed={active}>
      {title}
    </Button>
  );
};

export default memo(ControlButton);
