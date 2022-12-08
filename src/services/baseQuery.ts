import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { getToken } from 'src/utils/helpers/localStorage'

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}`,
  prepareHeaders: headers => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

export const baseQueryWithoutToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}`
})
