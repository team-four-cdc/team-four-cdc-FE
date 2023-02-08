import { Button, ButtonProps } from 'antd';

interface StandardButtonProps extends ButtonProps {
  label?: string;
}

export default function StyledButton(props: StandardButtonProps) {
  return (
    <Button {...props} style={{ borderRadius: '2em' }}>
      {props.label}
    </Button>
  );
}
