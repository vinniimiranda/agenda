
import { API } from '../services/api'
import { enqueueSnackbar } from '../store/modules/notifier/actions'

type DeleteProps = {
  id: number;
  url: string;
  name: string;
  setReload: (state: any) => any;
  dispatch: any;
}

function deleteRequest ({ url, name, id, setReload, dispatch }: DeleteProps) {
  const confirmation = window.confirm(`Tem certeza que deseja excluír o ${name}?`)

  if (!confirmation) {
    return
  }
  const deleteData = async () => {
    API.delete(`${url}/${id}`, {
      data: []
    })
      .then(() => {
        dispatch(enqueueSnackbar({
          message: `${name} excluído com sucesso!`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          }
        }))
        return setReload((prev: boolean) => !prev)
      })
      .catch((err) => {
        if (err.response) {
        }
      })
  }
  deleteData()
}

export default deleteRequest
