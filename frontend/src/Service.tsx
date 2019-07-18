import React, { useEffect, useState } from 'react';
import { FCProps } from './shared/types/FCProps';
import { SERVER_URL } from './Dashboard';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Typography } from '@material-ui/core';

interface OwnProps {
    match: any
}
type Props = FCProps<OwnProps>

export const Service = (props: Props) => {
    const classes = useStyles();
    const { match } = props;
    const [data, setData] = useState<any>(null);
    console.log("SERVICE", match, data)
    useEffect(() => {
        if (match) {
            getData();
            const intervalId = setInterval(getData, 5000)
            return () => clearInterval(intervalId);
        }
    }, []);

    const getData = () => axios.get(`${SERVER_URL}/status?target=${match.params.id}`).then(res => setData(res.data.data[0]));
    return (
        <div className={classes.cube}>
            <Typography>
                Name: {data && data.name}
            </Typography>

            <Typography>
                Status: {data && data.exitCode === 0 ? 'Online' : 'Offline'}
            </Typography>
        </div>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cube: {
            padding: 50,
            margin: 50,
        },
    }),
);