// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// **  Components Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const ReadAloud = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: '16px', boxShadow: '0 1.6rem 3rem rgb(0 0 0 / 10%)' }}>
          <CardHeader title='Read Aloud' titleTypographyProps={{ variant: 'h6' }} />
        </Card>

        <Card sx={{ boxShadow: '0 1.6rem 3rem rgb(0 0 0 / 10%)' }}>
          <CardHeader title='Search' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ReadAloud
