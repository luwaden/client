import { Alert } from "react-bootstrap";

export const MessageBox = ({
  variant = "info",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) => {
  return <Alert variant={variant || "info"}>{children}</Alert>;
};
