import ConfessionForm from "../components/ConfessionForm";
import ConfessionList from "../components/ConfessionList";

import "./Home.css";

export default function Home() {
  return (
    <section className="home-container">
      <h1>
        Confieza tus secretos y comparte tus pensamientos con la comunidad. Aquí
        puedes enviar confesiones anónimas y leer las de otros usuarios.
      </h1>
      <ConfessionForm />
      <ConfessionList />
    </section>
  );
}
