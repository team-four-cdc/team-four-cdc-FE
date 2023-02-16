import { Input, InputProps, Typography } from 'antd';

interface TextInputProps extends InputProps {
  label?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  helperText?: string;
  helperTextClassName?: string;
  helperTextStyle?: React.CSSProperties;
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
    'aria-description': props.helperText,
    className:
      'px-2.5 py-1.5 text-14px rounded-full ' + (props.className ?? ''),
    style: {
      ...props.style,
    },
  };

  return (
    <>
      {props.label !== undefined ? (
        <Typography
          className={
            'mb-10px text-12px font-semibold ' + (props.labelClassName ?? '')
          }
          style={props.labelStyle}
        >
          {props.label}
        </Typography>
      ) : null}

      {props.type === 'password' ? (
        <Input.Password {...allProps} />
      ) : (
        <Input {...allProps} />
      )}

      {props.helperText !== undefined ? (
        <Typography
          className={
            'text-12px opacity-90 ' + (props.helperTextClassName ?? '')
          }
          style={props.helperTextStyle}
        >
          {props.helperText}
        </Typography>
      ) : null}
    </>
  );
}
