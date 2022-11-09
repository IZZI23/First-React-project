import React from "react";
import styled from "styled-components";

function Search(props) {
  return (
    <FormStyle onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Enter Here..."
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  width: 50%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  input {
    margin: 1rem 0rem 2rem 0rem;
    border: none;
    background: linear-gradient(45deg, #c9c9c9df, #eaeaea);
    font-size: 1.4rem;
    color: white;
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    width: 100%;
    &::placeholder {
        color: #000000;
        opacity: 0.5;
    }
  }
`;
export default Search;
