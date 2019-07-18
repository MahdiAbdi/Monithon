import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { FCProps } from "./shared/types/FCProps";
interface OwnProps { }
type Props = FCProps<OwnProps>;
export const TopBar = (props: Props) => props.children;

const useStyles = makeStyles(() =>
    createStyles({

    }),
);