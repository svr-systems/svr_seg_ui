export const URL = "http://127.0.0.1:8000";
export const URL_API = `${URL}/api`

export const headers = token => {
  let headers = {
    'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return { headers }
}

export const msgAlert = (type, msg) => {
  return {
    showConfirmButton: false,
    icon: type,
    text: msg,
    timer: 4000,
  }
}

export const msgConfirm = msg => {
  return {
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Sí",
    icon: "warning",
    text: msg,
  }
}

export const msgConfirmCancel = msg => {
  return {
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí",
    showDenyButton: true,
    denyButtonText: `No`,
    icon: "warning",
    text: msg,
  }
}

export const dateTimeNow = () => {
  let dt = new Date();

  return `${dt.getFullYear().toString().padStart(4, "0")}-${(
    dt.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dt.getDate().toString().padStart(2, "0")} ${dt
      .getHours()
      .toString()
      .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
}

export const toFormData = data => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      Array.isArray(data[key])
    ) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData
}

export const rules = () => {
  return {
    pwd: [
      (v) => !!v || 'Campo requerido.',
      (v) => (v && v.length >= 8) || 'Mínimo 8 caracteres.',
      (v) => (v && v.length <= 15) || 'Máximo 15 caracteres.',
      (v) => /(?=.*[A-Z])/.test(v) || 'Al menos una mayúscula.',
      (v) => /(?=.*[a-z])/.test(v) || 'Al menos una minúscula.',
      (v) => /(?=.*\d)/.test(v) || 'Al menos un número.',
      (v) => /([!@$%*])/.test(v) || 'Al menos un caractere especial (! @ $ % *).'
    ],
    email: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length <= 50) || "Máximo 50 caracteres.",
      (v) => /.+@.+\..+/.test(v) || "Formato invalido.",
    ],
    emailNR: [
      v => {
        if (v) return (v && v.length <= 50) || "Máximo 50 caracteres."
        else return true
      },
      v => {
        if (v) return /.+@.+\..+/.test(v) || "Formato invalido."
        else return true
      },
    ],
    required: [
      (v) => !!v || "Campo requerido.",
    ],
    username: [
      (v) => !!v || 'Campo requerido.',
      (v) => /^[A-Za-z0-9\-]*$/.test(v) || 'Solo caracteres alfanuméricos y guión medio'
    ],
  }
}