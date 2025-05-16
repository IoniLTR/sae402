import { useLocation } from "react-router-dom";
import RepondreAReponse from "./RepondreAReponse";

export default function RepondreAReponseWrapper() {
  const location = useLocation();
  const { reponseOriginale } = location.state || {};

  if (!reponseOriginale) return <p>Erreur : aucune réponse sélectionnée.</p>;

  return <RepondreAReponse reponseOriginale={reponseOriginale} />;
}
