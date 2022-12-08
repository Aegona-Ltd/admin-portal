import toast from 'react-hot-toast'

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function beforeUpload(file, messages) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error(messages['common.message.error.wrongImageType'] || 'You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error(messages['common.message.error.imageBiggerThan2MB'] || 'Image must smaller than 5MB!')
  }

  return isJpgOrPng && isLt2M
}

//#region FORM VALIDATE - Antd
export function validateEmail(value, message) {
  message = message || 'Không đúng định dạng email!'
  if (
    value &&
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}
export function validatePassword(value, message) {
  message = message || ' '

  // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (value && !regex.test(value)) {
    return Promise.reject(message)

    // return Promise.reject("Mật khẩu ít nhất 8 kí tự, bao gồm ít nhất có 1 chữ số, chữ hoa, chữ thường và kí tự đặc biệt!")
  }

  return Promise.resolve()
}
export function validateName(value, message) {
  message = message || 'Họ tên không bao gồm chữ số và ký tự!'
  if (value && /[\d-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value)) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}
export function validatePhoneNumber(value, message) {
  message = message || 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại !'
  if (value && !/^[0-9]{8,12}$/.test(value)) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}
export function validateNoSpecialCharacter(value, message) {
  message = message || 'Không được chứa kí tự đặc biệt!'
  if (value && /[\-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value)) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}
export function validateNumberInt(value, message) {
  message = message || 'Vui lòng nhập số nguyên lớn hơn 0.'
  if (value && !/^[1-9][0-9]*$/.test(value)) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}

export function validateNumberGreatThanZero(value, message) {
  message = message || 'Số lớn hơn 0.'
  if (value && !/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(value)) {
    return Promise.reject(message)
  }

  return Promise.resolve()
}

//#endregion

export function displayToast(type, message) {
  const msg = message
  switch (message) {
    case 'EMAIL_EXISTED':
      msg = 'Email đã tồn tại'
      break

    case 'INVALID_LOGIN':
      msg = 'Sai email hoặc mật khẩu'
      break

    default:
      msg = message
      break
  }

  toast[type](msg, {
    duration: 8000,
    position: 'top-center',

    // Styling
    style: {},
    className: '',

    // Custom Icon
    // icon: '👏',

    // Change colors of success/error/loading icon
    // iconTheme: {
    //   primary: '#000',
    //   secondary: '#fff'
    // },

    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite'
    }
  })
}
