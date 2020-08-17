import { useState, useEffect } from 'react'
import axios from 'axios'

import { API } from '../services/api'

type RequestProps = {
  url: string;
  params?: {
    page?: number;
    limit?: number;
  },
}

function useRequest<T> ({ url, params }: RequestProps) {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setLoading(true)
    API.get(url, {
      params: {
        ...params
      },
      cancelToken: source.token
    })
      .then(({ data }) => {
        setData(data.data)
        setTotal(data.meta.total)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => { source.cancel() }

    // eslint-disable-next-line
  }, [params, reload])

  return { loading, error, data, total, reload, setReload }
}

export default useRequest
