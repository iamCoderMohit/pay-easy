import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

interface buttonProps{
    text: string,
    path: string
}

const CustomButton = ({text, path}: buttonProps) => {
    const router = useRouter()
  return (
    <StyledWrapper>
      <button className='cursor-pointer'
      onClick={() => router.push(`${path}`)}
      > # {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   padding: 0.6em 1em;
   border: 4px solid #fa725a;
   transition: ease-in-out 0.3s;
   background-color: transparent;
   color: #fa725a;
   font-weight: bolder;
   font-size: 16px;
  }

  button:hover {
   transform: scale(1.2) rotate(10deg);
   background-color: #fa725a;
   color: white;
  }`;

export default CustomButton;
