import React from 'react';
import { IconButton, Theme, useTheme, makeStyles, createStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { FCProps } from "./shared/types/FCProps";
import { drawerWidth } from "./constansts/drawer";
import clsx from "clsx";
interface OwnProps {
    open: boolean;
    handleDrawerOpen: () => void;
}
type Props = FCProps<OwnProps>;
export const TopBar = (props: Props) => {
    const classes = useStyles();
    const { handleDrawerOpen, open } = props;
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Monithon
    </Typography>
            </Toolbar>
        </AppBar>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
    }),
);