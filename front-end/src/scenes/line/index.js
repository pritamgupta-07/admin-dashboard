import { Box } from '@mui/material'
import Header from '../../components/Header'
import Line from '../../components/LineChart'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

const LineCharts = () => {
  return (
    <Box m='20px'>
      <Header title='Line Charts' subtitle='Simple Line Charts'/>
      <Box height='65vh' display='flex'>
      <AutoSizer>
          { ({height,width})=>(<Box height={height} width={width}>
            <Line/>
          </Box>)}
          </AutoSizer>
      </Box>
    </Box>
  )
}

export default LineCharts
