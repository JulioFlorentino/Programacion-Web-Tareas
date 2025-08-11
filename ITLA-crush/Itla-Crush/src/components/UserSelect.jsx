export default function UserSelect({
  recipientType,
  setRecipientType,
  recipientUid,
  setRecipientUid,
  otherName,
  setOtherName,
}) {
  // Ejemplo de usuarios de prueba (luego vendrán de Firebase)
  const users = [
    { uid: "u1", name: "Juan Pérez" },
    { uid: "u2", name: "María López" },
  ];

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Destinatario:</label>
      <select
        value={recipientType === "user" ? recipientUid : "other"}
        onChange={(e) => {
          if (e.target.value === "other") {
            setRecipientType("other");
            setRecipientUid("");
          } else {
            setRecipientType("user");
            setRecipientUid(e.target.value);
          }
        }}
        style={{ display: "block", marginTop: "0.5rem" }}
        required
      >
        <option value="">-- Seleccionar --</option>
        {users.map((u) => (
          <option key={u.uid} value={u.uid}>
            {u.name}
          </option>
        ))}
        <option value="other">OTRO</option>
      </select>

      {recipientType === "other" && (
        <input
          type="text"
          placeholder="Nombre del crush"
          value={otherName}
          onChange={(e) => setOtherName(e.target.value)}
          style={{ marginTop: "0.5rem", display: "block", width: "100%" }}
          required
        />
      )}
    </div>
  );
}
