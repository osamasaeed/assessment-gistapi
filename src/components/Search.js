import React, { useEffect } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import { getGistForUser, getPublicGists } from '../services/gistService';
import { userActions } from '../redux'
import { connect } from 'react-redux';

let timeoutInstance = null;

const Search = ({ setGists, setUsername, setError }) => {

  useEffect(async () => {
    const publicGists = await getPublicGists();
    setGists(publicGists.data);
  }, [])

  const handleKeyDown = async event => {
    await clearTimeout(timeoutInstance);
    timeoutInstance = setTimeout(() => {
      fetch(event)
    }, 500)
  }
  const fetch = async (event) => {
    setUsername(event.target.value);
    if (event.target.value) {
      try {
        const userGists = await getGistForUser(event.target.value);
        await setGists(userGists.data);
      } catch (error) {
        setError(error);
        setGists([]);
      }
    } else {
      const publicGists = await getPublicGists();
      await setGists(publicGists.data);
    }
  }
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

// connect( Mapping states to props , Mapping Actions to Props) (Component)
export default connect(({ states }) => states, userActions)(Search);
