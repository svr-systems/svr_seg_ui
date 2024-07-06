export const URL = "http://127.0.0.1:8000";
export const API = URL + "/api";

export const hdrs = (token = null) => {
  let headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return { headers };
};

export const val = (rsp) => {
  return rsp.data;
};

export const err = (e) => {
  let val = null;

  if (e.msg) {
    val = e;
  } else {
    if (e.response.data.err) {
      val = e.response.data;
    } else {
      val = {
        msg: "Error. Contacte al equipo de desarrollo",
        err: e.response.request.response,
      };
    }
  }

  console.log(val.err);

  return val.msg;
};

export const rules = () => {
  return {
    required: [(v) => !!v || "Campo requerido."],
    email: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length <= 50) || "Máximo 50 caracteres.",
      (v) => /.+@.+\..+/.test(v) || "Formato invalido.",
    ],
    emailNR: [
      (v) => {
        if (v) return (v && v.length <= 50) || "Máximo 50 caracteres.";
        else return true;
      },
      (v) => {
        if (v) return /.+@.+\..+/.test(v) || "Formato invalido.";
        else return true;
      },
    ],
    pwd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length >= 8) || "Mínimo 8 caracteres.",
      (v) => (v && v.length <= 15) || "Máximo 15 caracteres.",
      (v) => /(?=.*[A-Z])/.test(v) || "Al menos una mayúscula.",
      (v) => /(?=.*[a-z])/.test(v) || "Al menos una minúscula.",
      (v) => /(?=.*\d)/.test(v) || "Al menos un número.",
      (v) =>
        /([!@$%*])/.test(v) || "Al menos un caractere especial (! @ $ % *).",
    ],
    nickname: [
      (v) => !!v || "Campo requerido.",
      (v) =>
        /^[A-Za-z0-9\-]*$/.test(v) ||
        "Solo caracteres alfanuméricos y guión medio",
    ],
  };
};

export const toFormData = (data) => {
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

  return formData;
};

export const dateTimeNow = () => {
  let dt = new Date();

  return `${dt.getFullYear().toString().padStart(4, "0")}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dt.getDate().toString().padStart(2, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
