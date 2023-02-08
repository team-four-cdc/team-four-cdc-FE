import { Input, InputProps, Typography } from 'antd';

interface TextInputProps extends InputProps {
  label?: string;
  helperText?: string;
}

// Currently only supports regular <Input/> and <Input.Password/>
/**
 * Text input element
 * @param label input label text, appears on top of the input element
 * @param helperText input helper/hint text, appears under the input element
 * @param ... props from Ant Design <Input/> element
 * @returns {JSX.Element} text input element
 */
export default function TextInput(props: TextInputProps): JSX.Element {
  const allProps = {
    ...props,
    'aria-label': props.label,
    style: {
      borderRadius: '3em',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      fontSize: 14,
      ...props.style,
    },
  };

  return (
    <>
      <Typography style={{ fontWeight: 600, fontSize: 12 }}>
        {props.label}
      </Typography>

      {props.type === 'password' ? (
        <Input.Password {...allProps} />
      ) : (
        <Input {...allProps} />
      )}

      {props.helperText ? (
        <Typography style={{ fontSize: 12, opacity: 0.9 }}>
          {props.helperText}
        </Typography>
      ) : null}
    </>
  );
}