// Test.js - this is the page which carries the built up area calculator

import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio } from '@mui/material'
import { Grid } from '@mui/material'
import BarChart from '../../charts/BarChart';
import PdfGenerator from '../../PDF/PdfGenerator';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';


const Test = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [budget, setBudget] = useState('medium');
  const [selectedUnit, setSelectedUnit] = useState('squareFeet'); // Default unit
  const [entryValue, setEntryValue] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Check if the input is a positive integer
    if (/^[1-9]\d*$/.test(value) || value === '') {
      setInputValue(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Please type a positive value');
    }
  };

  const handleEntryValueChange = (value) => {
    // Update the entry value asynchronously
    setTimeout(() => {
      setEntryValue(value);
    });
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleSubmit = () => {
    if (!errorMessage) {
      setDisplayedValue(inputValue);
      setFormSubmitted(true); // Set formSubmitted to true after the first submit
    }
  };

  useEffect(() => {
    // Update the entry value when it changes in the BarChart component
    setEntryValue(entryValue);
  }, [entryValue]);


  const downloadPdf = async () => {
    const doc = new jsPDF();
  
    // Title
    doc.text("Cost Report", 20, 10);
  
    // Project Gist details
    doc.text("Project Gist", 20, 20);
    doc.text(`Your required area is ${displayedValue} ${selectedUnit === 'squareFeet' ? 'sq.ft' : 'sq.m'}`, 20, 30);
    doc.text(`Your project can cost a total of Rs.${entryValue}.`, 20, 40);
  
    // BarChart
    const chartContainer = document.getElementById('barChartContainer'); // Replace 'barChartContainer' with the actual ID or class of your BarChart container
    if (chartContainer) {
      const canvas = await html2canvas(chartContainer);
      const imageData = canvas.toDataURL('image/png');
      doc.addImage(imageData, 'PNG', 20, 50, 150, 75); // Adjust the position and size of the chart image
    }
  
    // Save the PDF
    doc.save('Cost Report.pdf');
  };
  
  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
              <CardContent>
                <h2>Enter your built-up area</h2>
                <TextField
                  type="text"
                  value={inputValue}
                  placeholder="Enter a positive integer"
                  onChange={handleInputChange}
                />
                <RadioGroup
                  row
                  aria-label="unit"
                  name="unit"
                  value={selectedUnit}
                  onChange={handleUnitChange}
                >
                  <FormControlLabel value="squareFeet" control={<Radio />} label="Square Feet" />
                  <FormControlLabel value="squareMeter" control={<Radio />} label="Square Meter" />
                </RadioGroup>
                <InputLabel htmlFor="budget">Budget</InputLabel>
                <Select
                  value={budget}
                  onChange={handleBudgetChange}
                  displayEmpty
                  inputProps={{
                    id: 'budget',
                  }}
                >
                  <MenuItem value="" disabled>
                    Choose your budget
                  </MenuItem>
                  <MenuItem value="low">Low Budget</MenuItem>
                  <MenuItem value="medium">Medium Budget</MenuItem>
                  <MenuItem value="high">High Budget</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 250, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Project Gist</h2>
                <p>Your required area is {displayedValue} {selectedUnit === 'squareFeet' ? 'sq.ft' : 'sq.m'}</p>
                <p>Your project can cost a total of Rs.{entryValue}.</p>
                {/* wrap the buttons in form submitted so as to only appear after submit */}
                {formSubmitted && (
                  <>
                    <Button variant="contained" sx={{ width: '100%', padding: 1 }} onClick={downloadPdf}>
                      Download PDF
                    </Button>
                    <br />
                    <br />
                    <Button variant="contained" sx={{ width: '100%', padding: 1 }}>
                      Download Excel Report
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 300, sm: 615, md: 615, lg: 615 } }} className='gradient3'>
              <CardContent>
                <h2>Budget Split</h2>
                <BarChart title={displayedValue} budget={budget} unit={selectedUnit} onEntryValueChange={handleEntryValueChange} />
                <PdfGenerator displayedValue={displayedValue} budget={budget} entryValue={entryValue} selectedUnit={selectedUnit} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Test;
