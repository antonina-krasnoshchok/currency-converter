import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import * as constants from '../../../../constants';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { getFromCurrency, getToCurrency, getFilter } from '../../../converter/selectors';
import { setFilter } from '../../actions';

const moment = require('moment');

const Chart = () => {
    const dispatch = useDispatch();

    const fromCurrency = useSelector(state => getFromCurrency(state));
    const toCurrency = useSelector(state => getToCurrency(state));
    const filter = useSelector(state => getFilter(state));

    const [historyChart, setHistoryChart] = useState({});
    const [historyChartData, setHistoryChartData] = useState([]);

    const handleChangeFilter = (e) => {
        dispatch(setFilter(e.target.value));
    }

    const initChart = () => {
        let chart = am4core.create('chart', am4charts.XYChart);
        chart.paddingRight = 20;

        chart.data = [];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';

        series.tooltipText = '{valueY.value}';
        chart.cursor = new am4charts.XYCursor();
        setHistoryChart(chart); 
    }

    const getDataForChart = async() => {
        if (fromCurrency && toCurrency) {
            const today = moment().format('YYYY-MM-DD');
            const startDate = moment().subtract(filter, 'months').format('YYYY-MM-DD');
            await axios.get(`${constants.BASE_URL}/history?start_at=${startDate}&end_at=${today}`)
            .then(({data}) => {
              const { rates, base } = data;
              let dataArr = [];
              Object.keys(rates).forEach(item => {
                  const fromCurrencyValue = (base === fromCurrency) ? 1 : rates[item][fromCurrency];
                  const toCurrencyValue = (base === toCurrency) ? 1 : rates[item][toCurrency]; 
                  dataArr.push({
                      date: item,
                      value: toCurrencyValue/fromCurrencyValue
                  })
              });
              dataArr.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              setHistoryChartData(dataArr);
            })
            .catch(error => {
                console.log(error.response)
                setHistoryChartData([]);
            }); 
        } else {
            setHistoryChartData([]);
        }
    }

    useEffect(() => {
        initChart();
    }, []);

    useEffect(() => {
        getDataForChart();
    }, [fromCurrency, toCurrency, filter]);

    useEffect(() => {
        historyChart.data = historyChartData;
    }, [historyChartData])

    return (
        <Box paddingTop={5}>
            <Grid container spacing = {3}>
                <Grid item xs = {12} hidden = {(historyChartData.length > 0) ? '' : 'hidden'}>
                    <InputLabel htmlFor="filter">Filter</InputLabel>
                    <Select
                        value = {filter}
                        onChange = {handleChangeFilter}
                        id = 'filter'
                    >
                        <MenuItem value={3}>3 months</MenuItem>
                        <MenuItem value={6}>6 months</MenuItem>
                        <MenuItem value={9}>9 months</MenuItem>
                        <MenuItem value={12}>year</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs = {12} >
                    <div 
                        id = 'chart' 
                        style = {{ width: '100%', height: '400px', visibility: (historyChartData.length > 0) ? 'visible' : 'hidden' }}
                    >
                    </div>
                </Grid>
            </Grid>  
        </Box>
    );
}

export default Chart;