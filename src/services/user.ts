import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithToken } from './baseQuery'
import { ApiRouters } from 'src/utils/api/apiRouters'
import { PaginationParams } from 'src/models/common'
import { User, UserCreate, ListResponse, ErrorResponse } from 'src/models'
import { handleCallApiError } from 'src/utils/helpers/api'

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: baseQueryWithToken,
  endpoints: builder => ({
    getUsers: builder.query<ListResponse<User>, PaginationParams>({
      query: params => ({
        url: `${ApiRouters.USERS}`,
        params,
        method: 'GET'
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data
        }
      },
      transformErrorResponse: (res: ErrorResponse) => {
        handleCallApiError(res.status)
      }
    }),

    createUser: builder.mutation<any, UserCreate>({
      query: (body: any) => ({
        url: ApiRouters.USERS,
        body,
        method: 'POST'
      })
    }),

    deleteUsers: builder.mutation<any, string>({
      query: (body: string) => ({
        url: `${ApiRouters.USERS}/DeleteListLearner?${body}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUsersMutation } = UserApi
