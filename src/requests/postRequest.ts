
import { API } from '../services/api'
import { enqueueSnackbar } from '../store/modules/notifier/actions'

type PostProps = {
  url: string;
  name: string;
  data: any;
  setReload: (state: any) => void;
  dispatch: any;
}

function postRequest ({ url, name, data, setReload, dispatch }: PostProps) {
  const postData = async () => {
    API.post(`${url}`, data)
      .then(() => {
        dispatch(enqueueSnackbar({
          message: `${name} criado com sucesso!`,
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
  postData()
}

export default postRequest
