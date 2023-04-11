import { Button, ButtonProps } from 'antd';

interface StandardButtonProps extends ButtonProps {
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
export default function StyledButton(props: StandardButtonProps): JSX.Element {
  const { label, round, active } = props;
  const roundClass = round ? round : 'rounded-full';
  const activeClass = active ? active : '';

  return (
    <Button
      {...props}
      className={(props.className ?? '') + ' ' + roundClass + ' ' + activeClass}
    >
      {label}
    </Button>
  );
}
