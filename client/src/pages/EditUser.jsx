import React, { useContext } from "react";
import WaiterForm from "../components/WaiterForm";
import useUpdateUser from "../hooks/useUpdateUser";
import { userContext } from "./Dashboard";
import UpdateWaiterForm from "../components/UpdateWaiterForm";

function EditUser() {
  const user = useContext(userContext);
  console.log(user);
  let role = "";

  const {
    message,
    isLoading,
    form,
    handleChange,
    validateSubmitForm,
    clearMessage,
    fieldError,
  } = useUpdateUser(user);
  return (
    <section
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <h1>Update your profile</h1>

        <UpdateWaiterForm
          message={message}
          isLoading={isLoading}
          form={form}
          handleChange={handleChange}
          submitForm={validateSubmitForm}
          clearMessage={clearMessage}
          fieldError={fieldError}
          user={user ? user : { first_name: "", last_name: "", username: "" }}
        />
      </div>
    </section>
  );
}

export default EditUser;
