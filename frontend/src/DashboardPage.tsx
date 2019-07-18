import React, { useState, useEffect } from 'react';
import { FCProps } from './shared/types/FCProps';
import { Grid, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';
import { Link } from 'react-router-dom';
import { SERVER_URL } from './Dashboard';
import axios from 'axios';
import { borderRadius } from '@material-ui/system';

interface OwnProps {
    setIsDrawerOpen: () => void;
}
type Props = FCProps<OwnProps>

export const DashboardPage = (props: Props) => {
    const classes = useStyles();
    // const [data, setData] = useState<any[] | null>(null);
    const [status, setStatus] = useState<any>(null);

    useEffect(() => {
        // getData();
        getStatus();
        const intervalId = setInterval(() => { getStatus(); }, 5000)
        return () => clearInterval(intervalId);
    }, []);

    const getStatus = () => axios.get(`${SERVER_URL}/status`).then(res => setStatus(res.data.data));

    // const getData = () => axios.get(`${SERVER_URL}/targets`).then(res => setData(res.data.data));
    console.log(status)
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.statusGrid}>Online Services: {status ? status.length : 0} / {status ? status.length : 0}</div>
            </Grid>
            <Grid container>
                {status ? status.map((item: any) =>
                    <Grid item xs={4} className={classes.serviceGrid}>
                        <Link className={classes.disableLink} key={item.name} to={`/services/${item.name}`}>
                            <Typography>Name: {item.name}</Typography>
                            <Typography>Status: {item.exitcode == 0 ? 'Online' : 'Offline'}</Typography>
                        </Link>
                    </Grid>
                ) : <p>No Data</p>}
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statusGrid: {
            height: 100,
            width: 500,
            padding: 50,
            margin: 40,
        },
        serviceGrid: {
            // height: 100,
            // width: 600,
            padding: 30,
            margin: 20,
            border: `1px solid green`,
            borderRadius: 10
        },
        disableLink: {
            textDecoration: 'none',
            color: 'black'
        }
    }),
);