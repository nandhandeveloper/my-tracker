import React from 'react';
import {
    InputLabel,
    InputAdornment,
    IconButton,
    FormLabel,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type Props = {
    controlDetails: any;
    onInputChangeHandler: (
        e: React.ChangeEvent<{
            name?: string;
            value: unknown;
        }>,
    ) => void;
    handleClickShowPassword?: (name: string) => void;
    handleMouseDownPassword?: () => void;
};

type Option = {
    id: string;
    value: string;
    label: string;
};

const DynamicFormField: React.FC<Props> = ({
    controlDetails,
    onInputChangeHandler,
    handleClickShowPassword,
    handleMouseDownPassword,
}) => {
    const {
        name,
        type,
        isTouched,
        rows,
        showPassword,
        errors,
        isValid,
        multiline,
        label,
        value,
        options,
        row,
        radios,
        disabled,
    } = controlDetails;
    let formELement = null;
    switch (type) {
        case 'select':
            formELement = (
                <FormControl fullWidth>
                    <InputLabel id={name + '1'}>{label}</InputLabel>
                    <Select
                        labelId={name + '1'}
                        id={name}
                        name={name}
                        value={value}
                        error={isTouched && !isValid}
                        onChange={(e) => onInputChangeHandler(e)}
                        disabled={disabled}
                    >
                        {options.map((option: Option) => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {isTouched &&
                        !isValid &&
                        errors.map((err: string, i: number) => (
                            <FormHelperText error={true} key={i}>
                                {err}
                            </FormHelperText>
                        ))}
                </FormControl>
            );
            break;
        case 'radio':
            formELement = (
                <FormControl fullWidth margin="dense" component="fieldset">
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup
                        row={row}
                        aria-label={label}
                        name={name}
                        value={value}
                        onChange={(e) => onInputChangeHandler(e)}
                    >
                        {radios.map((radio: Option) => (
                            <FormControlLabel
                                key={radio.id}
                                value={radio.value}
                                control={<Radio color="primary" />}
                                label={radio.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
            break;
        case 'checkbox':
            formELement = (
                <FormControl margin="dense" fullWidth>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value}
                                onChange={(e) => onInputChangeHandler(e)}
                                name={name}
                                color="primary"
                            />
                        }
                        label={label}
                    />
                    {isTouched &&
                        !isValid &&
                        errors.map((err: string, i: number) => (
                            <FormHelperText error={true} key={i}>
                                {err}
                            </FormHelperText>
                        ))}
                </FormControl>
            );
            break;
        case 'showpassword':
            formELement = (
                <FormControl margin="dense" fullWidth>
                    <TextField
                        error={isTouched && !isValid}
                        id={name}
                        multiline={multiline}
                        rows={rows}
                        label={label}
                        name={name}
                        onChange={(e) => onInputChangeHandler(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword && handleClickShowPassword(name)}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        value={value}
                        type={showPassword ? 'text' : 'password'}
                    />
                    {isTouched &&
                        !isValid &&
                        errors.map((err: string, i: number) => (
                            <FormHelperText error={true} key={i}>
                                {err}
                            </FormHelperText>
                        ))}
                </FormControl>
            );
            break;
        case 'password':
        case 'email':
        default:
            formELement = (
                <FormControl margin="dense" fullWidth>
                    <TextField
                        error={isTouched && !isValid}
                        id={name}
                        multiline={multiline}
                        rows={rows}
                        label={label}
                        name={name}
                        onChange={(e) => onInputChangeHandler(e)}
                        value={value}
                        type={type}
                    />
                    {isTouched &&
                        !isValid &&
                        errors.map((err: string, i: number) => (
                            <FormHelperText error={true} key={i}>
                                {err}
                            </FormHelperText>
                        ))}
                </FormControl>
            );
            break;
    }
    return formELement;
};

export default DynamicFormField;
