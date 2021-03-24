import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons';
import { connect } from 'react-redux'
import Gist from './Gist'

const GistList = ({ gists, error }) => {
    const gistsWrapper = () => {
        if (gists && gists.length)
            return gists.map((gist, index) => <Gist key={index} gist={gist} />)
        else
            return (
                <div style={styles.textCenter}>
                    <h1>{error}</h1>
                    <Search style={{ fontSize: 200 }} />
                </div>)
    }


    return <>
        <Container maxWidth="md" style={{ marginTop: 50 }}>
            <div className={styles.center}>
                <div className={styles.containerDiv}>
                    {gistsWrapper()}
                </div>
            </div>
        </Container>
    </>
}

// connect( Mapping states to props , Mapping Actions to Props) (Component)
export default connect(({ states }) => states, null)(GistList)


const styles = {
    containerDiv: {
        width: 600
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textCenter: {
        textAlign: "center"
    }
};