import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Avatar,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@material-ui/core';
import {
    ChatBubbleOutline,
    Code,
    FileCopy,
    DeviceHub
} from '@material-ui/icons';
import moment from 'moment';

// Single Gist Wrapper component
const Gist = ({ gist }) => {

    return (
        <React.Fragment>
            <Paper className={styles.card} elevation={0}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <List>
                            <a
                                href={gist.owner.html_url}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={gist.owner.avatar_url}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Typography style={styles.username}>
                                            {gist.owner.login}
                                        </Typography>
                                    } />
                                </ListItem>
                            </a>
                        </List>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <List>
                            <a
                                href={`https://gist.github.com/${gist.owner.login}/${gist.id}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Code className={styles.assetsIcon} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Typography style={styles.assets}>
                                            {Object.keys(gist.files).length} Files
                            </Typography>
                                    } />
                                </ListItem>
                            </a>
                        </List>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <List>
                            <a
                                href={`https://gist.github.com/${gist.owner.login}/${gist.id}/forks`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <DeviceHub className={styles.assetsIcon} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Typography style={styles.assets}>
                                            Forks
                            </Typography>
                                    } />
                                </ListItem>
                            </a>
                        </List>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <List>
                            <a
                                href={`https://gist.github.com/${gist.owner.login}/${gist.id}#comments`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <ChatBubbleOutline className={styles.assetsIcon} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Typography style={styles.assets}>
                                            {gist.comments} Comments
                            </Typography>
                                    } />
                                </ListItem>
                            </a>
                        </List>
                    </Grid>
                    <Grid item xs={3} style={{marginLeft:20}}>
                        <Typography style={styles.timeStamp}>
                            Created at: {moment(gist.created_at).format("L")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={styles.timeStamp}>
                            Last updated: {moment(gist.updated_at).format("L")}
                        </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} style={{marginLeft:20}}>
                        <Typography style={styles.description}>
                            {gist.description}
                        </Typography>
                    </Grid>
                    <br />
                    <Grid item xs={12} style={{marginLeft:30}}>
                        <Grid container>
                            {
                                Object.keys(gist.files).map((key, index) =>
                                    <Grid item xs key={index}>
                                        <a href={gist.files[key].raw_url} target="_blank" style={{ textDecoration: "none" }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <FileCopy className={styles.assetsIcon} />
                                                </ListItemAvatar>
                                                <ListItemText primary={
                                                    <Typography style={{ ...styles.assets, textDecoration: "none" }}>
                                                        {key}
                                                    </Typography>
                                                } />
                                            </ListItem>
                                        </a>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </React.Fragment>
    )
}

export default Gist;


const styles = {
    card: {
        padding: 10,
        textAlign: "center"
    },
    username: {
        fontSize: 12,
        color: "blue",
        textDecoration: "none",
        cursor: "pointer",
        marginLeft: -5
    },
    assets: {
        fontSize: 12,
        color: "blue",
        textDecoration: "none",
        cursor: "pointer",
        marginLeft: -27,
    },
    assetsIcon: {
        marginTop: 7,
        color: "blue",
    },
    timeStamp: {
        fontSize: 12,
        alignText: "center"
    },
    description: {
        fontSize: 14,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 20,
    },
    textCenter: {
        textAlign: "center"
    }
};


