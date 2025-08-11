import { useState } from "react";
import UserSelect from "./UserSelect";

export default function ConfessionForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [text, setText] = useState("");
  const [recipientType, setRecipientType] = useState("user");
  const [recipientUid, setRecipientUid] = useState("");
  const [otherName, setOtherName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      anonymous,
      visibility: isPublic ? "public" : "private",
      recipientType,
      recipientUid: recipientType === "user" ? recipientUid : null,
      recipientName: recipientType === "other" ? otherName : null,
      text,
    };
    console.log("Confession:", data);
    // Luego aquí guardaremos en Firebase
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "1rem", maxWidth: "500px" }}
    >
      <UserSelect
        recipientType={recipientType}
        setRecipientType={setRecipientType}
        recipientUid={recipientUid}
        setRecipientUid={setRecipientUid}
        otherName={otherName}
        setOtherName={setOtherName}
      />

      <label>
        Mensaje de amor:
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu confesión..."
          style={{ width: "100%", minHeight: "100px", marginTop: "0.5rem" }}
        />
      </label>

      <div style={{ marginTop: "0.5rem" }}>
        <label>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Enviar como anónimo
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          Declaración pública
        </label>
      </div>

      <button
        type="submit"
        style={{
          marginTop: "1rem",
          background: "#f06292",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
    </form>
  );
}
