import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithToken } from './baseQuery'
import { ApiRouters } from 'src/utils/api/apiRouters'
import { PaginationParams, ErrorResponse } from 'src/models'
import { handleCallApiError } from 'src/utils/helpers/api'

import { Learner } from 'src/models'

export const LearnerApi = createApi({
  reducerPath: 'LearnerApi',
  baseQuery: baseQueryWithToken,
  endpoints: builder => ({
    getLearners: builder.query<any, PaginationParams>({
      query: params => ({
        url: `${ApiRouters.LEARNERS}`,
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
    createLearner: builder.mutation<any, Learner>({
      query: (body: any) => ({
        url: ApiRouters.LEARNERS,
        body,
        method: 'POST'
      })
    }),
    deleteLearners: builder.mutation<any, string>({
      query: (body: string) => ({
        url: `${ApiRouters.LEARNERS}/DeleteListLearner?${body}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetLearnersQuery, useCreateLearnerMutation, useDeleteLearnersMutation } = LearnerApi
