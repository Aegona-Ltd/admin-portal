import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithoutToken } from './baseQuery'
import { ApiRouters } from 'src/utils/api/apiRouters'

import { PostPutResponse, UserLogin } from 'src/models'

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: baseQueryWithoutToken,
  endpoints: builder => ({
    login: builder.mutation<PostPutResponse<UserLogin>, { userName: string; password: string }>({
      query: (body: any) => ({
        url: ApiRouters.LOGIN,
        body,
        method: 'POST'
      })
    }),
    forgotPassword: builder.mutation<any, { userName: string }>({
      query: (body: any) => ({
        url: ApiRouters.FORGOT_PASSWORD,
        body,
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useForgotPasswordMutation } = AuthApi
