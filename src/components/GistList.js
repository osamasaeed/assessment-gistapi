import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons';
import { connect } from 'react-redux'
import Gist from './Gist'

// list of the gist which render all the gistslist to Gist component by map iteration. 
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


    return <React.Fragment>
        <Container maxWidth="md" style={{ marginTop: 50 }}>
            <div className={styles.center}>
                <div className={styles.containerDiv}>
                    {/* rendering the mapped data of gists list with react-dom elements  */}
                    {gistsWrapper()}
                </div>
            </div>
        </Container>
    </React.Fragment>
}

// connection to component to redux store for managing states
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