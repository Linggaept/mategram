import Password from "./profil/password";
import ProfilPart from "./profil/profil";
export default function Profil() {
  return (
    <div className="flex flex-col gap-8">
      <ProfilPart />
      <Password />
    </div>
  );
}
