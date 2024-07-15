export const URL = "http://127.0.0.1:8000";
export const API = URL + "/api";

export const hdrs = (token = false, form_data = false) => {
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
  };

  if (form_data) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }

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
    nickname: [
      (v) => !!v || "Campo requerido.",
      (v) =>
        /^[A-Za-z0-9\-]*$/.test(v) ||
        "Solo caracteres alfanuméricos y guión medio",
    ],
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
    fileLmt: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.size <= 786432) || "El tamaño máximo de carga es de 768kB",
    ],
    fileLmtNR: [
      (v) => {
        if (v)
          return (
            (v && v.size <= 786432) || "El tamaño máximo de carga es de 768kB"
          );
        else return true;
      },
    ],
  };
};

export const objAssign = (data, store) => {
  let obj = Object.assign({}, data);

  if (!store) {
    obj["_method"] = "PATCH";
  }

  return obj;
};

export const objDocs = (obj, prop, subprop) => {
  //HOW TO USE: obj = objDocs(obj, "items", "doc");
  let i = 0;
  for (let val of obj[prop]) {
    obj[prop.substring(0, prop.length - 1) + "_doc_" + i] = val[subprop];
    i++;
  }

  return obj;
};

export const toFormData = (data) => {
  let form_data = new FormData();

  Object.keys(data).forEach((key) => {
    if (
      !(data[key] instanceof File) &&
      typeof data[key] == "object" &&
      data[key] != null
    ) {
      form_data.append(key, JSON.stringify(data[key]));
    } else {
      form_data.append(key, data[key]);
    }
  });

  return form_data;
};

export const b64ToBlob = (b64, ext) => {
  const binary_string = window.atob(b64.replace(/\s/g, ""));
  const len = binary_string.length;
  let bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return new Blob([bytes.buffer], {
    type: "application/" + ext,
  });
};

export const dateTimeNow = (sprDate = "-", sprBwn = " ", sprTime = ":") => {
  let dt = new Date();

  return (
    dt.getFullYear().toString().padStart(4, "0") +
    sprDate +
    (dt.getMonth() + 1).toString().padStart(2, "0") +
    sprDate +
    dt.getDate().toString().padStart(2, "0") +
    sprBwn +
    dt.getHours().toString().padStart(2, "0") +
    sprTime +
    dt.getMinutes().toString().padStart(2, "0") +
    sprTime +
    dt.getSeconds().toString().padStart(2, "0")
  );
};
