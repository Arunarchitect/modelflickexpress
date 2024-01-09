
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio, Table, TableRow, TableCell, Alert,
  TableContainer, Paper, TableHead, TableBody , Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,} from '@mui/material'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';  // Import dayjs library
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useGetJobprofileQuery, useSaveProfileMutation, useGetProjectprofileQuery , useGetWorkprofileQuery, useDeleteProfileMutation} from '../../services/jobApi';
import { useGetProjectQuery} from '../../services/testApi';
import moment from 'moment';
import { useState , useRef, useEffect} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import CancelIcon from '@mui/icons-material/Cancel';






const Employee = () => {

  const { data: jobData } = useGetJobprofileQuery(); // Rename data to jobData
  const { data: projectData } = useGetProjectQuery();
  // Assuming useGetProjectsQuery is a separate hook for fetching projects
  const { data: taskData } = useGetWorkprofileQuery(); 
  const [saveProfile] = useSaveProfileMutation();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);





  // excel export function
  const tableref = useRef(null)
  const data = [
    
  ]
  const {onDownload} = useDownloadExcel({
    currentTableRef:tableref.current,
    filename:'Job_report',
    sheet: 'UserData'
  })

  //pdf export function
  const downloadPdf = () => {
    const doc = new jsPDF();
  
    // Title
    doc.text("Job Report", 20, 10);
  
    // Table headers
    const headers = ["Project Name", "Work Name", "Start Time", "End Time", "Total Hours"];
  
    // Table data
    const data = jobs.map((job) => [
      job.project.name,
      job.work.name,
      moment(job.start_time).format('YYYY-MM-DD HH:mm:ss'),
      moment(job.end_time).format('YYYY-MM-DD HH:mm:ss'),
      calculateTotalHours(job.start_time, job.end_time),
    ]);
  
    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20, // Adjust the starting Y position as needed
    });
  
    // Save the PDF
    doc.save('Job_Report.pdf');
  };
  
  

  const jobs = jobData ? jobData.jobs : [];
  const projects = projectData ? projectData : []; 

  // Immediately calculate revenue with the default value
  useEffect(() => {
    if (jobs.length > 0) {
      calculateRevenue();
    }
  }, [jobs]); // Trigger when jobs data changes
  

  const tasks = taskData ? taskData.work : []; 
  // console.log('taskData:', taskData);

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });


  const calculateTotalHours = (startTime, endTime) => {
    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    const duration = moment.duration(endMoment.diff(startMoment));
    const totalHours = duration.asHours();

    return totalHours.toFixed(2); // Display total hours with two decimal places
  };

  const calculateGrandTotalHours = () => {
    let grandTotal = 0;
    jobs.forEach((job) => {
      grandTotal += parseFloat(calculateTotalHours(job.start_time, job.end_time));
    });
    return grandTotal.toFixed(2);
  };


  const [pproject, setPproject] = useState('');
  const [pwork, setPwork] = useState('');
  const [pstartdate, setPstartdate] = useState(new Date());
  const [penddate, setPenddate] = useState(new Date());


  const [formValues, setFormValues] = useState({
    pproject: '',
    pwork: '',
    pstartdate: new Date(),
    penddate: new Date(),
  });

  const resetForm = () => {
    setFormValues({
      pproject: '',
      pwork: '',
      pstartdate: new Date(),
      penddate: new Date(),
    });
    document.getElementById('project-form').reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (pproject && pproject.id && pproject.name && pwork && pwork.id && pwork.name && pstartdate && penddate) {
      const payload = {
        project: {
          id: pproject.id,
          name: pproject.name,
          description: pproject.description,
          created_by: pproject.created_by,

        },
        work: {
          id: pwork.id,
          name: pwork.name,
        },
        start_time: dayjs(pstartdate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        end_time: dayjs(penddate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
      };
  
      console.log("Payload:", payload); // Log the payload to the console for debugging
  
  
      try {
        const res = await saveProfile(payload);
  
        if (res && res.data && res.data.status === 'success') {
          setError({ status: true, msg: 'Uploaded Successfully', type: 'success' });
          resetForm(); // Reset the form after successful submission
        } else {
          setError({ status: true, msg: 'Upload Failed', type: 'error' });
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        setError({ status: true, msg: 'An error occurred', type: 'error' });
      }
    } else {
      setError({ status: true, msg: 'All fields are required', type: 'error' });
    }
  };
  
  

  //payment calculation
  const [paymentPerHour, setPaymentPerHour] = useState(100); // Set the default value to 100
  const [revenue, setRevenue] = useState(0);

  // Immediately calculate revenue with the default value
  useEffect(() => {
    calculateRevenue();
  }, []); // Trigger on component mount

  // Calculate revenue when the component mounts or when paymentPerHour changes
  useEffect(() => {
    calculateRevenue();
  }, [paymentPerHour]); // Trigger when paymentPerHour changes

  const calculateRevenue = () => {
    const grandTotalHours = parseFloat(calculateGrandTotalHours());
    const paymentPerHourValue = parseFloat(paymentPerHour || 100); // Use the provided value or default to 100
    const revenueValue = grandTotalHours * paymentPerHourValue;
    setRevenue(revenueValue.toFixed(2));
  };
  

  const handleDeleteJob = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteDialogOpen(true);
  };
  
  const [deleteProfileMutation] = useDeleteProfileMutation();

const handleConfirmDelete = async () => {
  try {
    const res = await deleteProfileMutation(selectedJobId);
    // Handle the response as needed
    setDeleteDialogOpen(false);
  } catch (error) {
    console.error('Error during job deletion:', error);
    // Handle error, show an alert, etc.
  }
};

      

    

  
  

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 350, sm: 300, md: 300, lg: 300 }, overflow: 'auto'  ,padding: 2}} className='gradient3'>
              <CardContent>
                <Typography variant="h5">Name</Typography>
                <Typography variant="h6">Designation</Typography>
                <Typography variant="h6">Involved Projects</Typography>
              </CardContent>
              <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
  <Table ref={tableref} sx={{ tableLayout: 'auto' }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Project Name</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Work Name</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Start Time</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>End Time</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Total Hours</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
  {jobs
    .slice()
    .sort((a, b) => moment(a.start_time).valueOf() - moment(b.start_time).valueOf())
    .map((job) => (
      <TableRow key={job.id}>
        <TableCell sx={{ fontSize: '12px' }}>{job.project.name}</TableCell>
        <TableCell sx={{ fontSize: '12px' }}>{job.work.name}</TableCell>
        <TableCell sx={{ fontSize: '12px' }}>{moment(job.start_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        <TableCell sx={{ fontSize: '12px' }}>{moment(job.end_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        <TableCell sx={{ fontSize: '12px' }}>{calculateTotalHours(job.start_time, job.end_time)}</TableCell>
        <TableCell>
          {/* Red Round Cross Icon */}
          <CancelIcon
  color="error"
  sx={{ cursor: 'pointer' }}
  onClick={() => handleDeleteJob(job.id)}
/>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

    <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to delete this job?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirmDelete} color="error">
      Confirm Delete
    </Button>
  </DialogActions>
</Dialog>

  </Table>
</TableContainer>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 350, sm: 300, md: 300, lg: 350 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 ,padding: 2  } }} className='gradient3'>
              <CardContent>
                <h2>Work Data Dashboard</h2>
                <Typography variant="h6">Grand Total Hours: {calculateGrandTotalHours()}</Typography>
                <Typography variant="h6">Payment per hour</Typography>
                <TextField
                  type="number"
                  value={paymentPerHour}
                  onChange={(e) => {
                    setPaymentPerHour(e.target.value);
                    calculateRevenue(); // Calculate revenue instantly on value change
                  }}
                  sx={{ width: '100%', padding: 1 }}
                />


                <Typography variant="h6">Revenue in Rs: {revenue}</Typography>

                <br />
                <Button variant="contained" sx={{ width: '100%', padding: 1 }} onClick={downloadPdf}>
                  Download PDF
                </Button>
                <br />
                <br />
                <Button variant="contained" sx={{ width: '100%', padding: 1 }} onClick={onDownload}>
                  Download Excel Report
                </Button>
              </CardContent> 
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 500, sm: 615, md: 615, lg: 665 } }} className='gradient3'>
  <CardContent>
  <Box component="form" sx={{ p: 3 }} noValidate id='project-form' onSubmit={handleSubmit} >
    <Typography variant="h5">Add work</Typography>
    <Typography variant="h6">Record your Work</Typography>

    {/* Project Dropdown */}
<div style={{ width: '100%' }}>
  <InputLabel htmlFor="projectDropdown">Project</InputLabel>
  <Select
    value={pproject ? pproject.id : ''}
    onChange={(e) => {
      const selectedProject = projectData.find((project) => project.id === e.target.value);
      setPproject(selectedProject);  // Correctly setting the selected project object
      console.log("Selected Project:", selectedProject);
    }}
    sx={{ width: '100%', height: '40px', padding: 1 }}
  >

    <MenuItem value="" disabled>
      Choose your Project
    </MenuItem>
    {projectData && projectData.map((project) => (
      <MenuItem key={project.id} value={project.id}>
        {project.name}
      </MenuItem>
    ))}
  </Select>
</div>


    {/* Work Dropdown */}
<div style={{ width: '100%' }}>
  <InputLabel htmlFor="workDropdown">Work</InputLabel>
  <Select
  value={pwork ? pwork.id : ''}
  onChange={(e) => {
    const selectedWork = taskData.jobs.find((task) => task.id === e.target.value);
    setPwork(selectedWork);  // Correctly setting the selected work object
  }}
  sx={{ width: '100%', height: '40px', padding: 1 }}
>

  <MenuItem value="" disabled>
    Choose your Work
  </MenuItem>
  {taskData && taskData.jobs && taskData.jobs.map((task) => (
    <MenuItem key={task.id} value={task.id}>
      {task.name}
    </MenuItem>
  ))}
</Select>
</div>


    {/* Start Time DateTimePicker */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Start Time"
        // value={pstartdate}
        onChange={(date) => setPstartdate(date)}
        required
        sx={{ width: '100%', padding: 1 }}
      />
    </LocalizationProvider>

    {/* End Time DateTimePicker */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="End Time"
        // value={penddate}
        onChange={(date) => setPenddate(date)}
        required
        sx={{ width: '100%', padding: 1 }}
      />
    </LocalizationProvider>

    {/* Button to Add work data */}
    <Button variant="contained" sx={{ width: '100%', padding: 2 }} type="submit">
      Add work data
    </Button>
    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </ Box>
  </CardContent>
</Card>

          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Employee;
