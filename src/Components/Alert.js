import React from "react";

function Alert(props) {
  const capi=(word)=>{
    const lower=word.toLoweCase()
    return lower.charAt(0).toUpperCase()+lower.slice(1)
  }
  return (
    <div style={{height:"50px", position:"sticky"}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  );
}

export default Alert;

    // <div>
    //   <div class="alert alert-primary" role="alert">
    //     {props.msg}
    //   </div>
    // </div>