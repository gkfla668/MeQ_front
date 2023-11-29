import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 4rem;

  border-radius: 4rem;
  border: 2px solid #f7f7f7;

  background: rgba(255, 255, 255, 0.8);

  box-shadow: 5px 10px 20px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(25px);
`;

export const Button = styled.button<{ active: boolean }>`
  width: 100%;

  padding: 1.4rem 0;
  margin: 2rem;
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => (props.active ? "white" : "#ff7f00")};
  border-radius: 8rem;
  border: 2px solid #ff7f00;

  background-color: ${props => props.active && "#ff7f00"};

  &:hover {
    border: 2px solid #ffd37b;
    background-color: #ffd37b;
    color: white;
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1.2rem 3rem;

  border-radius: 80px;
  border: 1px solid #423227;

  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.1) inset;

  &::placeholder {
    font-size: 1.4rem;
    text-align: center;
  }

  &:focus {
    outline: none;
    border-radius: 80px;
    border: 1px solid #ff7f00;

    background: #fff;

    box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.1) inset;
  }
`;

export const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

export const Text = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: end;
`;

/** Form */
export const FormLabel = styled.div``;

export const RadioLabel = styled.label`
  white-space: nowrap;
  padding: 14px 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  border-radius: 50px;
  border: 1px solid #c7c2bf;

  background: #fff;

  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.1) inset;
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
  display: none;

  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }

  &:checked + ${RadioLabel} {
    color: white;
    border-radius: 50px;
    border: 1px solid #ff7f00;

    background: #ff7f00;

    box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.1) inset;
  }
`;
