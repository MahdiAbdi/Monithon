import React from 'react';
import clsx from 'clsx';
import { useTheme, CssBaseline, makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { AppDrawer } from './AppDrawer';
import { FCProps } from './shared/types/FCProps';
import { drawerWidth } from './constansts/drawer';
import { TopBar } from './TopBar';

interface OwnProps { }
type Props = FCProps<OwnProps>

export const Dashboard = () => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

    function handleDrawerOpen() {
        setIsDrawerOpen(true);
    }

    function handleDrawerClose() {
        setIsDrawerOpen(false);
    }

    const items: string[] = ['hey', 'two', 'three'];


    return <div className={classes.root}>
        <CssBaseline />
        <TopBar open={isDrawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <AppDrawer open={isDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: isDrawerOpen,
            })}
        >
            <p>HELLoooooo</p>
            <Grid container>
                <Grid item xs={12}>
                    <div>Number of Services: X/Y</div>
                </Grid>
                <Grid container>
                    {items.map(item => <Grid item xs={4}>{item}</Grid>)}
                </Grid>
            </Grid>
        </main>
    </div>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);