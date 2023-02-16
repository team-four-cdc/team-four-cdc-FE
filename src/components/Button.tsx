import { Button, ButtonProps } from 'antd';

interface StandardButtonProps extends ButtonProps {
  label?: string;
}

/**
 * Button element
 * @param label the text that appears inside the button
 * @param ... props from Ant Design <Button/> element, including `onClick()`
 * @returns {JSX.Element} button element
 */
export default function StyledButton(props: StandardButtonProps): JSX.Element {
  return (
    <Button {...props} className={(props.className ?? '') + ' rounded-full'}>
      {props.label}
    </Button>
  );
}
