import ConfessionForm from "../components/ConfessionForm";

export default function Dashboard() {
  return (
    <section>
      <h1>Área Privada 🔒</h1>
      <p>
        Solo usuarios registrados pueden ver declaraciones privadas y hacer
        confesiones.
      </p>
      <ConfessionForm />
      {/* Aquí luego cargaremos las declaraciones privadas */}
    </section>
  );
}
