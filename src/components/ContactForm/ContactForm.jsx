import { nanoid } from "nanoid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import styles from "./ContactForm.module.css";
import { Button } from "../Button/Button";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 symb long")
    .max(50, "Name must be at less 50 symb long")
    .required("This is a required field")
    .test(
      "is-not-empty",
      "Name cannot be just spaces",
      (value) => value?.trim().length > 0
    ),
  number: Yup.string()
    .min(3, "Phone must be at least 3 symb long")
    .max(50, "Phone must be at less 50 symb long")
    .required("This is a required field")
    .test(
      "is-not-empty",
      "Phone cannot be just spaces",
      (value) => value?.trim().length > 0
    ),
});

export const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        onAdd({ id: nanoid(), ...values });
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor={nameFieldId}>Name:</label>
          <Field className={styles.input} name="name" id={nameFieldId} />
          <ErrorMessage
            className={styles.error}
            name="name"
            component={"span"}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor={numberFieldId}>Phone:</label>
          <Field className={styles.input} name="number" id={numberFieldId} />
          <ErrorMessage
            className={styles.error}
            name="number"
            component={"span"}
          />
        </div>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
