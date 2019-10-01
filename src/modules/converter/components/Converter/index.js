import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import IconButton from '@material-ui/core/IconButton';
import NumberFormat from 'react-number-format';

import { getRates, getFromAmount, getFromCurrency, getToCurrency } from '../../selectors';
import { getRatesList, setAmount, setCurrency, switchCurrency } from '../../actions';

const Converter = () => {
    const dispatch = useDispatch();

    const [toAmount, setToAmount] = useState('');

    const rates = useSelector(state => getRates(state));
    const fromAmount = useSelector(state => getFromAmount(state));
    const fromCurrency = useSelector(state => getFromCurrency(state));
    const toCurrency = useSelector(state => getToCurrency(state));

    const handleChangeFromAmount = (e) => {
        dispatch(setAmount(e.target.value))
    }

    const handleChangeCurrency = (e) => {
        dispatch(setCurrency(e.target));
    }

    const handleSwitchCurrency = () => {
        dispatch(switchCurrency());
    }
    useEffect(() => {  
        dispatch(getRatesList());
    }, []);

    useEffect(() => {  
        if (fromAmount && fromCurrency && toCurrency) {
            const newToAmount = (fromAmount*rates[toCurrency]/rates[fromCurrency]).toFixed(2);
            setToAmount(newToAmount);
        }
    }, [fromAmount, fromCurrency, toCurrency]);

    return (
        <Grid container spacing = {3}>
            <Grid item xs = {6} md = {2}>
                <FormControl fullWidth = {true}>
                    <NumberFormat 
                        id = 'fromAmount'
                        name = 'fromAmount'
                        label = 'Amount from'
                        margin = 'none' 
                        value = {fromAmount}
                        customInput={TextField} 
                        decimalScale = '2'
                        allowNegative = {false}
                        onChange = {handleChangeFromAmount}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {6} md = {2}>
                <FormControl fullWidth = {true}>
                    <InputLabel htmlFor = 'fromCurrency'>Currency from</InputLabel>
                    <Select
                        value = {fromCurrency}
                        onChange={handleChangeCurrency}
                        id = 'fromCurrency'
                        name = 'fromCurrency'
                        >
                            <MenuItem value = ''>
                                <em>None</em>
                            </MenuItem>
                            { Object.keys(rates).map(item => 
                                <MenuItem key = {item} value = {item}>{item}</MenuItem>  
                            )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs = {12} md = {4} container justify = 'center'>
                <IconButton 
                    aria-label = 'switch'
                    onClick = {handleSwitchCurrency}
                >
                    <SyncAltIcon />
                </IconButton>
            </Grid>
            <Grid item xs = {6} md = {2}>
                <FormControl fullWidth = {true}>
                    <InputLabel htmlFor = 'toCurrency'>Currency to</InputLabel>
                    <Select
                        value = {toCurrency}
                        onChange={handleChangeCurrency}
                        id = 'toCurrency'
                        name = 'toCurrency'
                        >
                            <MenuItem value = ''>
                                <em>None</em>
                            </MenuItem>
                            { Object.keys(rates).map(item => 
                                <MenuItem key = {item} value={item}>{item}</MenuItem>  
                            )}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs = {6} md = {2}>
                <FormControl fullWidth = {true}>
                    <TextField
                        id = 'toAmount'
                        label = 'Amount to'
                        margin = 'none'
                        value = {toAmount}
                        type = 'number'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </FormControl>
            </Grid>
       
        </Grid>
    )
}

export default Converter;