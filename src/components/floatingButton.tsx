import { ReactElement } from "react";

type FloatingProp = {
  children: ReactElement;
  bottomPosition: string;
};
export default function FloatingButton({
  children,
  bottomPosition,
}: FloatingProp) {
  return <div className={`fixed ${bottomPosition} right-4`}>{children}</div>;
}
