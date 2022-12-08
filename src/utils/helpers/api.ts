import Swal from 'sweetalert2'
import { deleteToken } from '../helpers/localStorage'

export const handleCallApiError = (status: number | string) => {
  switch (status) {
    case 451:
      Swal.fire({
        title: 'Thông báo',
        text: 'Có sự thay đổi về hệ thống, vui lòng đăng nhập lại!',
        icon: 'info',
        confirmButtonColor: '#804BDF',
        confirmButtonText: 'Chuyển đến trang đăng nhập',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(result => {
        if (result.isConfirmed) {
          deleteToken()
          window.location.href = '/'
        }
      })
      break

    case 401:
      deleteToken()
      window.location.href = '/'
      break

    default:
      console.log(status)
      break
  }
}
