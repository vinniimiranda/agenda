
import { API } from '../services/api'
import { enqueueSnackbar } from '../store/modules/notifier/actions'

type UpdateProps = {
  id: number;
  url: string;
  name: string;
  data: any;
  setReload: (state: any) => void;
  dispatch: any
}

function updateRequest ({ url, name, data, id, setReload, dispatch }: UpdateProps) {
  const updateData = async () => {
    API.put(`${url}/${id}`, data)
      .then(() => {
        dispatch(enqueueSnackbar({
          message: `${name} atualizado com sucesso!`,
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
  updateData()
}

export default updateRequest
