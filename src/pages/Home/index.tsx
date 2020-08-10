import React, { useState, useEffect } from 'react'
import { Box, useTheme, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Theme, createStyles } from '@material-ui/core'
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts'

import { BsFillClockFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import moment from 'moment'
import 'moment/min/locales'

const data = [
  {
    name: 'Janeiro', amt: 150
  },
  {
    name: 'Fevereiro', amt: 70
  },
  {
    name: 'Março', amt: 229
  },
  {
    name: 'Abril', amt: 40
  },
  {
    name: 'Maio', amt: 120
  },
  {
    name: 'Junho', amt: 214
  },
  {
    name: 'Julho', amt: 170
  }
]

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      color: theme.palette.primary.main
    },
    body: {

      fontSize: 14,
      margin: '2rem !important',
      '&:first-child': {
        borderTopLeftRadius: '3rem',
        borderBottomLeftRadius: '3rem'

      },
      '&:last-child': {
        borderTopRightRadius: '3rem',
        borderBottomRightRadius: '3rem'
      }

    }
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderTop: `16px solid ${theme.palette.background.default}`,
      borderBottom: `16px solid ${theme.palette.background.default}`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1rem !important',
      '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff !important'

      }
    }
  })
)(TableRow)
const Home: React.FC = () => {
  const theme = useTheme()

  const [day, setDay] = useState(moment())

  useEffect(() => {
    setInterval(() => {
      setDay(moment())
    }, 1000)
  }, [])

  return <Box display="flex"
    justifyContent="space-around"
    flexDirection="column">
    <Box display="flex" justifyContent="center">
      <Box padding="1rem 2rem" minWidth="22rem"
        boxShadow="0px 3px 10px rgba(0,0,0,0.10)"
        bgcolor={theme.palette.background.paper} margin="1rem 0" borderRadius="1rem">
        <span style={{ fontSize: '1.3rem', color: theme.palette.primary.main }}>
          {day.locale('pt-BR').format('D [de] MMMM [de] YYYY [às] HH:mm:ss')}
        </span>
      </Box>
    </Box>

    <Grid container spacing={1} >
      <Grid item lg={6} md={6} sm={12} xs={12} xl={8}>
        <Box display="flex" padding="2rem" flex="1" bgcolor={theme.palette.background.paper} boxShadow="0px 3px 15px rgba(0,0,0,0.05)" borderRadius="1rem" flexDirection="column">
          <Box display="flex" justifyContent="space-between" flex={1}>
            <span style={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}>Consultas</span>
            <span style={{ color: theme.palette.primary.main, fontSize: '1rem' }}>Exibir por: <b>Mês</b></span>
          </Box>
          <Box display="flex" flex="1">
            <ResponsiveContainer width="99%" height={200} debounce={1} >
              <AreaChart
                data={data}
                margin={{
                  top: 20, right: 0, left: 0, bottom: 5
                }}
                style={{
                  color: '#fff'
                }}

              > <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Area type="monotone" dataKey="amt" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
                <Tooltip />

              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xl={4}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="1rem" margin="1rem">

          <Box bgcolor="#4E90DD" padding="1rem" borderRadius="1rem" boxShadow="0px 3px 15px rgba(0,0,0,0.05)">
            <span className="animate" style={{ color: '#fff', fontSize: '1rem' }}>Consultas realizadas no mês: </span>
            <span className="animate" style={{
              color: '#fff',
              textAlign: 'center',
              display: 'block',
              fontSize: '2rem',
              margin: '0.5rem 0'
            }}>
              50
            </span>
          </Box>
          <Box bgcolor="#F80057" padding="1rem" borderRadius="1rem" boxShadow="0px 3px 15px rgba(0,0,0,0.05)">
            <span className="animate" style={{ color: '#fff', fontSize: '1rem' }}>Consultas agendadas no mês: </span>
            <span className="animate" style={{
              color: '#fff',
              textAlign: 'center',
              display: 'block',
              fontSize: '2rem',
              margin: '0.5rem 0'
            }}>
              137
            </span>
          </Box>

          <Box bgcolor="#4eddb5" padding="1rem" borderRadius="1rem" boxShadow="0px 3px 15px rgba(0,0,0,0.05)">
            <span className="animate" style={{ color: '#fff', fontSize: '1rem' }}>Estimativa de recebimento: </span>
            <span className="animate" style={{
              color: '#fff',
              textAlign: 'center',
              display: 'block',
              fontSize: '2rem',
              margin: '0.5rem 0'
            }}>
              R$ 7.500
            </span>
          </Box>
          <Box bgcolor="#f87200" padding="1rem" borderRadius="1rem" boxShadow="0px 3px 15px rgba(0,0,0,0.05)">
            <span className="animate" style={{ color: '#fff', fontSize: '1rem' }}>Estimativa de recebimento: </span>
            <span className="animate" style={{
              color: '#fff',
              textAlign: 'center',
              display: 'block',
              fontSize: '2rem',
              margin: '0.5rem 0'
            }}>
              R$ 7.500
            </span>
          </Box>

        </Box>
      </Grid>
    </Grid>
    <Box display="flex" justifyContent="space-between">
      <Grid container spacing={1} >
        <Grid item lg={6} md={6} sm={12} xs={12} xl={8}>
          <Box padding="1rem" >

            <h2 style={{
              color: theme.palette.primary.main,
              margin: '.4ren'
            }}>
              Próximas consultas
            </h2>
            <TableContainer >
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>

                    <StyledTableCell align="center" >Nome</StyledTableCell>
                    <StyledTableCell align="center" >Especialidade</StyledTableCell>
                    <StyledTableCell align="center" >Dia</StyledTableCell>
                    <StyledTableCell align="center" >Hora</StyledTableCell>
                    <StyledTableCell align="center" >Status</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {[1, 3, 2, 4, 6].map(app => (
                    <StyledTableRow key={app} style={{
                      margin: '1rem 0'
                    }}>
                      <StyledTableCell align="center" >Flavio</StyledTableCell>
                      <StyledTableCell align="center" >Ortodondia</StyledTableCell>
                      <StyledTableCell align="center" >09/08/2020</StyledTableCell>
                      <StyledTableCell align="center" >09:45</StyledTableCell>
                      <StyledTableCell align="center" >
                        {app % 2 !== 0 ? <BsFillClockFill style={{ color: '#f87200' }} /> : <FaCheck style={{ color: '#4eddb5' }} />}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xl={4}>
          <Box padding="1rem" >

            <h2 style={{
              color: theme.palette.primary.main,
              margin: '.4ren'
            }}>Calendário da Semana </h2>

          </Box>
        </Grid>
      </Grid>
    </Box>
  </Box>
}

export default Home
