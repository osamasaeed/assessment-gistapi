import React, { useEffect } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import { getGistForUser, getPublicGists } from '../services/gistService';
import { userActions } from '../redux'
import { connect } from 'react-redux';

let timeoutInstance = null;

const Search = ({ setGists, setError }) => {

  // react life cycle method triggered when component initialize
  useEffect(async () => {
    // service call to fetch public gists
    const publicGists = await getPublicGists();

    // setting public gists to the props by using redux
    setGists(publicGists.data);
  }, [])

  const handleKeyDown = async event => {
    // clearing timeout when user still typing in search bar
    await clearTimeout(timeoutInstance);

    // reinitiate timeout to trigger the api call once the user stop typing for half second
    timeoutInstance = setTimeout(() => {
      fetch(event)
    }, 500)
  }

  // fetching all public gists or public gists by username filter 
  // it is asyncronous function
  const fetch = async (event) => {
    
    if (event.target.value) {
      try {
        const userGists = await getGistForUser(event.target.value);
        await setGists(userGists.data);
      } catch (error) {
        setGists([]);
      }
    } else {
      // resetting username filter and get first 30 gists
      const publicGists = await getPublicGists();
      await setGists(publicGists.data);
    }
  }
  // rendering the results
  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input
          placeholder="Search Gists for the username"
          onKeyDown={handleKeyDown}
        />
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus{
    outline: 0;
  }
`;

// connection to component to redux store for managing states
// connect( Mapping states to props , Mapping Actions to Props) (Component)
export default connect(({ states }) => states, userActions)(Search);
