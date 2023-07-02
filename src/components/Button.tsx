import React from "react"
import { Button, ButtonProps } from 'antd';

interface Props extends ButtonProps {
  label?: string;
  round?: string;
  active?: string;
}

/**
 * Button element
 * @param label the text that appears inside the button
 * @param ... props from Ant Design <Button/> element, including `onClick()`
 * @returns {JSX.Element} button element
 */
export default function StyledButton(props: Props): JSX.Element {
  const { label, round, active } = props;
  const roundClass = round || 'rounded-full';
  const activeClass = active || '';

  return (
    <Button
      {...props}
      className={`${props.className ?? ''} ${roundClass} ${activeClass} text-xl flex justify-center items-center px-4 py-5`}
    >
      {label}
    </Button>
  );
}
