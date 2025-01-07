import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next'

const ContactForm = ({ setIsSent }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    phone: "",
    email: "",
    message: "",
  });
  const { t } = useTranslation();

  const onInputsChangeHandler = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const [type, setType] = useState({
    phone: true,
    email: true,
    message: true,
  });

  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const onSubmitForm = () => {
    // email validation
    if (inputs.email.length === 0) {
      setType((param) => ({
        ...param,
        email: false,
      }));
    } else if (!emailRegex.test(inputs.email)) {
      setType((param) => ({
        ...param,
        email: false,
      }));
    } else if (inputs.email.length !== 0) {
      setType((param) => ({
        ...param,
        email: true,
      }));
    }

    // message validation
    if (inputs.message.length === 0) {
      setType((param) => ({
        ...param,
        message: false,
      }));
    } else if (inputs.message.length !== 0) {
      setType((param) => ({
        ...param,
        message: true,
      }));
    }

    // phone validation
    if (inputs.phone.length === 0) {
      setType((param) => ({
        ...param,
        phone: false,
      }));
    } else if (inputs.phone.length !== 0) {
      setType((param) => ({
        ...param,
        phone: true,
      }));
    }

    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && type.phone && type.email && type.message) {
      axios
        .post(`${process.env.REACT_APP_URL}/api/form`, inputs)
        .then((res) => {});
      setIsSubmit(false);
      inputs.phone = "";
      inputs.email = "";
      inputs.message = "";
      setIsSent(true);
    }
  }, [isSubmit, type.phone, type.email, type.message]);
  return (
    <>
      <div className="contact__details__messagge-send-part__your-info">
        {type.email && type.message && type.phone ? <></> : <p>*Error</p>}
        <div className="contact__details__messagge-send-part__your-info__enter-part">
          <input
            type="text"
            inputMode="text"
            autoComplete="text"
            value={inputs.message}
            name="message"
            placeholder={t ('Contact.name')}
            className={type.message ? "success" : "error"}
            onChange={onInputsChangeHandler}
            enterKeyHint="done"
          />
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            value={inputs.email}
            className={type.email ? "success" : "error"}
            name="email"
            placeholder={t ('Contact.email')}
            onChange={onInputsChangeHandler}
            enterKeyHint="next"
          />
          <input
            type="number"
            inputMode="numeric"
            autoComplete="tel"
            value={inputs.phone}
            name="phone"
            className={type.phone ? "success" : "error"}
            placeholder={t ('Contact.phone')}
            onChange={onInputsChangeHandler}
            enterKeyHint="next"
          />
        </div>
        <button onClick={onSubmitForm}>{t ('Contact.send')}</button>
      </div>
    </>
  );
};

export default ContactForm;
