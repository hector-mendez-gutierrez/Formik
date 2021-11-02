import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Formulario() {
  //Cambiar el estado del mensaje del formulario!
  const [enviarFomulario, cambiarFormularioEnviado] = useState(false);

  return (
    <div className="contenedor">
      <Formik
        // Valores iniciales del formulario
        initialValues={{
          nombre: "",
          correo: "",
        }}
        //Validar el Formulario!
        validate={(valores) => {
          let errores = {};
          if (!valores.nombre) {
            errores.nombre = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre solo puede contener letras y espacios";
          }
          if (!valores.correo) {
            errores.correo = "Por favor ingresa un correo";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
              "El correo solo puede contener letras, numeros, guines y guines bajo";
          }

          return errores;
        }}
        //Funcion para enviar el formulario!
        onSubmit={(valores, { resetForm }) => {
          // Pasas los valores q necesites!
          resetForm();
          // console.log("Formulario Enviado!");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 3000);
        }}
      >
        {({ values, errors }) => (
          <Form className="formulario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Juanito Alcachofa"
                id="nombre"
              />
              <ErrorMessage
                name="nombre"
                component={() => <div className="error">{errors.nombre}</div>}
              />
            </div>

            <div>
              <label htmlFor="correo">Correo</label>
              <Field
                type="email"
                name="correo"
                placeholder="correo@correo.cl"
                id="correo"
              />

              <ErrorMessage
                name="correo"
                component={() => <div className="error">{errors.correo}</div>}
              />
            </div>

            <button type="submit">Enviar</button>
            {enviarFomulario && (
              <p className="exito">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
