import React from 'react'

import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'
import { Box, Button, useTheme } from '@material-ui/core'
import moment from 'moment'
import 'moment/min/locales'
moment.locale('pt-BR')

const Schedule: React.FC = () => {
  const theme = useTheme()

  return (
    <Box padding="2rem 0" height="100%">
      <h1 style={{
        color: theme.palette.primary.main
      }}>Consultas</h1>
      <Scheduler
        height="auto"
        locale="pt-BR"
        data={[]}
      >
        <ViewState

          defaultCurrentDate="2020-08-10"
        />

        <MonthView

          dayScaleLayoutComponent={({ ...restProps }) => <MonthView.DayScaleLayout {...restProps} cellComponent={({ ...restProps }) =>
            <MonthView.DayScaleCell
              {...restProps}

              formatDate={date => moment(date).locale('pt-BR').format('dddd')}
              style={{ height: '4rem', textTransform: 'capitalize', fontFamily: "'Reem Kufi Regular', sans-serif !important" }} />} />}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton buttonComponent={({ setCurrentDate }) => <Button onClick={() => setCurrentDate(new Date())} color="primary" variant="contained" >Hoje</Button>} />
        <Appointments />
      </Scheduler>

    </Box>
  )
}

export default Schedule
