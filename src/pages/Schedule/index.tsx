// @ts-nocheck
/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react'

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  DayView,
  TodayButton,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui'
import { connectProps } from '@devexpress/dx-react-core'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { withStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab, TextField,
  IconButton
  , Select, MenuItem, InputLabel, Box, FormControl, Theme, fade
} from '@material-ui/core/'

import {

  Add as AddIcon,
  Notes,
  Close,
  CalendarToday,
  Create,
  Person,
  WhatsApp
} from '@material-ui/icons/'

import moment from 'moment'
import 'moment/min/locales'
import { teal, blue, indigo } from '@material-ui/core/colors'
moment.locale('pt-BR')

const appointments = [
  { startDate: moment().set('hour', '08').set('minutes', '00'), endDate: moment().set('hour', '09').set('minutes', '00'), title: 'João da Silva', patient: 'João da Silva', id: 1, doc: 'Joana' },
  { startDate: moment().set('hour', '09').set('minutes', '10'), endDate: moment().set('hour', '09').set('minutes', '45'), title: 'José da Silva', patient: 'José da Silva', id: 2, doc: 'Joana' }
]

const containerStyles = (theme: Theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0
    },
    width: '50%'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  textField: {
    width: '100%'
  },
  appointment: {
    borderRadius: 0,
    borderBottom: 0
  },
  highPriorityAppointment: {
    borderLeft: `4px solid ${teal[500]}`
  },
  mediumPriorityAppointment: {
    borderLeft: `4px solid ${blue[500]}`
  },
  lowPriorityAppointment: {
    borderLeft: `4px solid ${indigo[500]}`
  },
  weekEndCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04)
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04)
    }
  },
  weekEndDayScaleCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06)
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }

})

const AppointmentContent = withStyles(containerStyles, { name: 'AppointmentContent' })(({
  classes, data, ...restProps
}: AppointmentContentProps) => {
  return (
    <Appointments.AppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div className={classes.text}>
            {`Paciente: ${data.patient}`}
          </div>
          <div className={classes.text}>
            {moment(data.startDate).format('HH:mm') + ' - ' + moment(data.endDate).format('HH:mm')}
          </div>
        </div>
        <div className={classes.text}>
          {`Médico(a): ${data.doc}`}
        </div>
      </div>
    </Appointments.AppointmentContent>
  )
})

type AppointmentFormContainerBasicProps = {
  appointmentData: any;
  commitChanges: any;
  classes: {
    textField: string;
    picker: string;
    header: string;
    closeButton: string;
    content: string
    wrapper: string
    icon: string
    buttonGroup: string
    button: string
  };
  visible: boolean;
  visibleChange: any;
  cancelAppointment: any;
  onHide: any;
  absoluteRef: any;
}

const AppointmentFormContainerBasic: React.FC<AppointmentFormContainerBasicProps> = ({
  appointmentData, commitChanges, classes,
  visible,
  visibleChange,
  cancelAppointment,
  onHide,
  absoluteRef
}: AppointmentFormContainerBasicProps) => {
  const [appointmentChanges, setAppointmentChanges] = React.useState({})

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      ...appointmentChanges,
      [field]: changes
    }
    setAppointmentChanges(nextChanges)
  }

  const commitAppointment = (type) => {
    const appointment = {
      ...appointmentData,
      ...appointmentChanges
    }
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id })
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } })
    } else {
      commitChanges({ [type]: appointment })
    }
    setAppointmentChanges({})
  }

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges
  }

  const isNewAppointment = appointmentData.id === undefined
  const applyChanges = isNewAppointment
    ? () => commitAppointment('added')
    : () => commitAppointment('changed')

  const textEditorProps = field => ({
    variant: 'outlined',
    onChange: ({ target: change }) => changeAppointment({
      field: [field], changes: change.value
    }),
    value: displayAppointmentData[field] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField
  })

  const selectEditorProps = (field, key) => ({
    variant: 'outlined',
    onChange: ({ target: change }) => changeAppointment({
      field: [key], changes: change.value
    }),
    value: displayAppointmentData[key] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField
  })

  const pickerEditorProps = field => ({
    className: classes.picker,
    // keyboard: true,
    ampm: true,
    value: displayAppointmentData[field],
    onChange: date => changeAppointment({
      field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field])
    }),

    inputVariant: 'outlined',
    format: 'DD/MM/YYYY HH:mm',
    onError: () => null
  })

  const cancelChanges = () => {
    setAppointmentChanges({})
    visibleChange()
    cancelAppointment()
  }

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={absoluteRef}
      fullSize
      onHide={onHide}
    >
      <div>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
          >
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('Título') as any}
            />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                label="Inicio"
                {...pickerEditorProps('startDate') as any}
              />
              <KeyboardDateTimePicker
                label="Fim"
                {...pickerEditorProps('endDate') as any}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className={classes.wrapper}>
            <Person className={classes.icon} color="action" />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Dr(a).</InputLabel>
              <Select {...selectEditorProps('Dr(a).', 'doc')}>

                <MenuItem value="Joana da Silva">Joana da Silva</MenuItem>

              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" style={{ marginLeft: '1rem' }}>
              <InputLabel>Paciente</InputLabel>
              <Select {...selectEditorProps('Paciente', 'patient')}>
                <MenuItem value="João da Silva">João da Silva</MenuItem>
                <MenuItem value="José da Silva">José da Silva</MenuItem>
              </Select>
            </FormControl>

          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('Anotações') as any}
              multiline
              rows="6"
            />
          </div>
          <div className={classes.wrapper}>

          </div>
        </div>
        <div className={classes.buttonGroup}>

          {!isNewAppointment && (<Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => {
              window.open(`https://wa.me/5511976362040?text=Flavio, gostaria de confirmar sua consulta: ${moment(appointmentData.startDate).format('DD/MM/YYYY [às] HH:mm')}`)
            }}
            startIcon={<WhatsApp />} >
            Confirmar
          </Button>)}
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              onClick={() => {
                visibleChange()
                commitAppointment('deleted')
              }}
            >
              Delete
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange()
              applyChanges()
            }}
          >
            {isNewAppointment ? 'Create' : 'Save'}
          </Button>
        </div>
      </div>
    </AppointmentForm.Overlay>
  )
}

const AppointmentFormContainer = withStyles(containerStyles as any, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic as any)

const styles = theme => ({
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4
  }
})

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: appointments,
      currentDate: new Date(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 8,
      endDayHour: 17,
      isNewAppointment: false,
      absoluteRef: React.createRef()
    }

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this)
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this)
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this)

    this.commitChanges = this.commitChanges.bind(this)
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this)
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this)
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
        absoluteRef
      } = this.state

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0] ||
        addedAppointment

      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false
          })
        }
      }

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
        absoluteRef
      }
    })
  }

  componentDidUpdate () {
    this.appointmentForm.update()
  }

  onEditingAppointmentChange (editingAppointment) {
    this.setState({ editingAppointment })
  }

  onAddedAppointmentChange (addedAppointment) {
    this.setState({ addedAppointment })
    const { editingAppointment } = this.state
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment
      })
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true })
  }

  setDeletedAppointmentId (id) {
    this.setState({ deletedAppointmentId: id })
  }

  toggleEditingFormVisibility () {
    const { editingFormVisible } = this.state
    this.setState({
      editingFormVisible: !editingFormVisible
    })
  }

  toggleConfirmationVisible () {
    const { confirmationVisible } = this.state
    this.setState({ confirmationVisible: !confirmationVisible })
  }

  commitDeletedAppointment () {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId)

      return { data: nextData, deletedAppointmentId: null }
    })
    this.toggleConfirmationVisible()
  }

  commitChanges ({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state
      if (added) {
        console.log(added)

        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
        data = [...data, { id: startingAddedId, ...added, allDay: false }]
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id], allDay: false } : { ...appointment, allDay: false }))
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted)
        this.toggleConfirmationVisible()
      }
      return { data, addedAppointment: {} }
    })
  }

  render () {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour
    } = this.state
    const { classes } = this.props

    return (<>
      <div ref={this.absoluteRef as any}>

      </div>
      <>
        <Scheduler
          data={data}

          locale="pt-BR"
        >
          <ViewState

            defaultCurrentDate={new Date()}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
            defaultAddedAppointment={{
              allDay: false
            }}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={30}
            intervalCount={1}
            excludedDays={[0]}
          />
          <DayView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={30}
            intervalCount={1}

          />
          <MonthView
            dayScaleLayoutComponent={({ ...restProps }) => <MonthView.DayScaleLayout {...restProps} cellComponent={({ ...restProps }) =>
              <MonthView.DayScaleCell
                {...restProps}
                formatDate={date => moment(date).locale('pt-BR').format('dddd')}
                style={{ height: '4rem', textTransform: 'capitalize', fontFamily: "'Reem Kufi Regular', sans-serif !important" }} />} />}

          />
          <EditRecurrenceMenu />
          <Appointments appointmentContentComponent={AppointmentContent} />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton buttonComponent={({ setCurrentDate }) => <Button onClick={() => setCurrentDate(new Date())} color="primary" variant="contained" >Hoje</Button>} />

          <ViewSwitcher switcherComponent={({ currentView, availableViews, onChange }) => <Box minWidth="10rem">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Exibir por</InputLabel>
              <Select label="Exibir por"
                onChange={e => onChange(e.target.value)} value={currentView.displayName} color="primary" variant="outlined">
                {availableViews.map(view => (
                  <MenuItem key={view.displayName} value={view.displayName}>{
                    view.displayName === 'Week' ? 'Semana' : view.displayName === 'Day' ? 'Dia' : 'Mês'
                  }</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>} />
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Fab
          color="primary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true })
            this.onEditingAppointmentChange(undefined)
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1)
            })
          }}
        >
          <AddIcon />
        </Fab>
      </>

    </>)
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo)
