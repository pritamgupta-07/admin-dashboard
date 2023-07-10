import { Box } from '@mui/material'
import Header from '../../components/Header'
import Bar from '../../components/BarChart'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

const BarChart = () => {
  return (
    <Box m='20px'>
      {/* header component */}
        <Header title='Bar Charts' subtitle='Simple Bar Chart'/>

        {/* Bar Chart component */}
        <Box height='65vh' display='flex'>
        <AutoSizer>
          { ({height,width})=>(<Box height={height} width={width}>
            {/* Bar component */}
            <Bar/>
          </Box>)}
          </AutoSizer>
        </Box>
    </Box>
  )
}

export default BarChart
