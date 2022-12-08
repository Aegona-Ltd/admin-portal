export interface PaginationParams {
  limit: number
  page: number
  search?: string | null
  [key: string]: any
}

export interface ListResponse<T> {
  data: T[]
  limit: number
  page: number
  total: number
  [key: string]: any
}

export interface ListParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'

  [key: string]: any
}

export interface PostPutResponse<T> {
  success: boolean
  data: T
}

export interface ErrorResponse {
  status: number | string
  data?: any
}
