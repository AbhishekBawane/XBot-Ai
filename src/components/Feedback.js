import React,{useState} from 'react'

export default function Feedback({ close }) {
      const [text, setText] = useState("");

const submit = (value) => {
    if (!value.trim()) {
      close(); 
      return;
    }

    console.log("Feedback submitted:", value);
    close(); 
  };
  return (
    <div
      className="feedback-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.62)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="feedback"
        style={{
          width: "760px",
          padding: "20px",
          background: "#efecf8ff",
          border: "2px solid black",
          boxShadow: "5px 5px 5px black",
          borderRadius:"10px"
          
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Provide Additional Feedback</h3>
          <button onClick={close} style={{border: "none", fontSize:"24px"}}>X</button>
        </div>

        <textarea style={{ width: "100%", height: "150px" }} value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={()=>submit(text)} style={{background:  "#c5bbdaff", fontSize:"20px", padding: "4px"}}>Submit</button>
      </div>
    </div>
  );
}
