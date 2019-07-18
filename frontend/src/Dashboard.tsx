import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme, CssBaseline, makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { AppDrawer } from './AppDrawer';
import { FCProps } from './shared/types/FCProps';
import { drawerWidth } from './constansts/drawer';
import { TopBar } from './TopBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';

interface OwnProps { }
type Props = FCProps<OwnProps>

export const SERVER_URL = `http://192.168.109.89:3000`;

export const Dashboard = () => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

    function handleDrawerClose() {
        setIsDrawerOpen(false);
    }

    function handleDrawerOpen() {
        setIsDrawerOpen(true);
    }
    
    return <div className={classes.root}>
        <CssBaseline />
        <TopBar open={isDrawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <AppDrawer open={isDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: isDrawerOpen,
            })}
        >
            <MainRoutes />
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
        statusGrid: {
            padding: 50,
            margin: 20,
            border: `1px solid blue`
        },
        serviceGrid: {
            padding: 50,
            margin: 20,
            border: `1px solid green`
        }
    }),
);