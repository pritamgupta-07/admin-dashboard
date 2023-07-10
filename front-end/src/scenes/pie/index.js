import { Box } from '@mui/material'
import Header from '../../components/Header'
import Pie from '../../components/pieChart'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

const PieChart = () => {
  return (
    <Box m='20px'>
        <Header title='Pie Charts' subtitle='Simple Pie Charts'/>
        <Box height='65vh' display='flex' flex='1 1 100%'>
          <AutoSizer>
          { ({height,width})=>(<Box height={height} width={width}>
            <Pie/>
          </Box>)}
          </AutoSizer>
        </Box>
      
    </Box>
  )
}

export default PieChart
