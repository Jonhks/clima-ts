import { ReactNode } from "react";
import classes from "./Alert.module.css";

const Alert = ({ children }: { children: ReactNode }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default Alert;
