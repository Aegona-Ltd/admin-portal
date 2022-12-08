// ** MUI Imports

// **  Components Imports
import Table from 'src/@core/components/datatable'

const MUITable = () => {
  const columns = [{ name: 'Name', options: { filterOptions: { fullWidth: true } } }, 'Title', 'Location']
  const data = [
    ['Gabby George', 'Business Analyst', 'Minneapolis'],
    ['Aiden Lloyd', "Business Consultant for an International Company and CEO of Tony's Burger Palace", 'Dallas'],
    ['Jaden Collins', 'Attorney', 'Santa Ana'],
    ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
    ['Aaren Rose', null, 'Toledo'],
    ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
    ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
    ['Jack Jackson', 'Business Analyst', 'El Paso'],
    ['Joe Jones', 'Computer Programmer', 'El Paso'],
    ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
    ['Jo Jo', 'Software Developer', 'Washington DC'],
    ['Donna Marie', 'Business Manager', 'Annapolis']
  ]

  return <Table title={'Danh sách học viên'} data={data} columns={columns} />
}

export default MUITable
