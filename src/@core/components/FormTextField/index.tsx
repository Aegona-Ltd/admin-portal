import React from 'react'
import { FieldProps, getIn } from 'formik'
import { TextFieldProps, TextField } from '@material-ui/core'

export const FormTextField: React.FC<FieldProps & TextFieldProps> = props => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, ...rest } = props

  return (
    <TextField
      style={{ minHeight: props.size === 'medium' ? '82px' : '68px' }}
      variant='outlined'
      fullWidth
      size='small'
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
      {...rest}
      {...field}
    />
  )
}
